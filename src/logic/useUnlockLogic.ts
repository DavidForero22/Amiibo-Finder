import { useState, useEffect, useRef, useMemo } from "react";
import { useAmiibo, type Amiibo } from "../context/AmiiboContext";
import {
	ApiError,
	type ApiErrorCode,
	getFullAmiiboList,
	readCachedAmiiboList,
	preloadImage,
	formatTime,
	triggerBrowserNotification,
} from "./utils";

const COOLDOWN_TIME = 2 * 60 * 60 * 1000; // 2 Hours in milliseconds

const amiiboId = (a: Amiibo) => a.head + a.tail;

/**
 * Custom hook that manages the logic for the "Mystery Gift" unlock mechanism.
 * Handles the countdown timer, API fetching, random selection, filtering of owned items,
 * and manages UI states (animations, loading, errors, modals).
 */
export const useUnlockLogic = () => {
	const { unlockAmiibo, triggerConfetti, userAmiibos } = useAmiibo();

	const [unlockedAmiibo, setUnlockedAmiibo] = useState<Amiibo | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isOpeningAnim, setIsOpeningAnim] = useState(false);
	const [remainingTime, setRemainingTime] = useState<number>(0);
	const [error, setError] = useState<ApiErrorCode | null>(null);
	const [errorDetail, setErrorDetail] = useState<string | undefined>();
	const [catalog, setCatalog] = useState<Amiibo[] | null>(() =>
		readCachedAmiiboList()
	);

	// Ref to prevent notification trigger on initial page load
	const isFirstCheck = useRef(true);

	const ownedIds = useMemo(
		() => new Set(userAmiibos.map(amiiboId)),
		[userAmiibos]
	);

	const isCollectionComplete =
		catalog !== null && catalog.every((a) => ownedIds.has(amiiboId(a)));

	// --- TIMER LOGIC ---
	useEffect(() => {
		const checkTimer = () => {
			const lastUnlock = localStorage.getItem("lastUnlockTime");

			if (lastUnlock) {
				const elapsed = Date.now() - parseInt(lastUnlock, 10);
				const left = COOLDOWN_TIME - elapsed;

				if (left > 0) {
					setRemainingTime(left);
					// Reset notification flag while waiting
					localStorage.setItem("amiiboNotificationSent", "false");
				} else {
					setRemainingTime(0);

					// Only notify when the timer expires while the page is open,
					// and only once per cycle.
					if (!isFirstCheck.current) {
						const notificationSent = localStorage.getItem(
							"amiiboNotificationSent"
						);

						if (notificationSent !== "true") {
							triggerBrowserNotification();
							localStorage.setItem("amiiboNotificationSent", "true");
						}
					} else {
						localStorage.setItem("amiiboNotificationSent", "true");
					}
				}
			}
			isFirstCheck.current = false;
		};

		checkTimer();
		const interval = setInterval(checkTimer, 1000);
		return () => clearInterval(interval);
	}, []);

	const isLocked = remainingTime > 0;

	// --- MAIN UNLOCK LOGIC ---
	const handleUnlock = async () => {
		if (isLoading || isOpeningAnim || isLocked) return;

		setIsLoading(true);
		setIsOpeningAnim(true);
		setError(null);
		setErrorDetail(undefined);

		try {
			const fullList = await getFullAmiiboList();
			setCatalog(fullList);

			const availableAmiibos = fullList.filter(
				(amiibo) => !ownedIds.has(amiiboId(amiibo))
			);

			if (availableAmiibos.length === 0) {
				setIsOpeningAnim(false);
				return;
			}

			const random =
				availableAmiibos[Math.floor(Math.random() * availableAmiibos.length)];

			// Wait for both the minimum animation time (800ms) and the image preload
			await Promise.all([
				new Promise((resolve) => setTimeout(resolve, 800)),
				preloadImage(random.imgwebp ?? random.image),
			]);

			localStorage.setItem("lastUnlockTime", Date.now().toString());
			localStorage.setItem("amiiboNotificationSent", "false");
			setRemainingTime(COOLDOWN_TIME);

			const amiiboToSave: Amiibo = {
				...random,
				unlockedAt: new Date().toISOString(),
			};
			delete amiiboToSave.type;

			unlockAmiibo(amiiboToSave);
			setUnlockedAmiibo(amiiboToSave);
			triggerConfetti();
		} catch (err) {
			console.error(err);
			setError(err instanceof ApiError ? err.code : "unknown");
			setErrorDetail(err instanceof Error ? err.message : String(err));
			setIsOpeningAnim(false);
		} finally {
			setIsLoading(false);
		}
	};

	const retry = () => {
		setError(null);
		setErrorDetail(undefined);
		void handleUnlock();
	};

	const closeModal = () => {
		setUnlockedAmiibo(null);
		setIsOpeningAnim(false);
	};

	return {
		unlockedAmiibo,
		isLoading,
		isOpeningAnim,
		remainingTime,
		isLocked,
		isCollectionComplete,
		error,
		errorDetail,
		handleUnlock,
		retry,
		closeModal,
		formatTime, // Re-exporting utility for the UI component
	};
};
