import { useEffect, useRef, useState } from "react";
import { usePresence } from "./usePresence";

/** Matches the `menu-out` animation in header.css. */
const EXIT_MS = 160;

const menuItems = (menu: HTMLElement | null) =>
    Array.from(menu?.querySelectorAll<HTMLElement>('[role^="menuitem"]') ?? []);

/**
 * State and keyboard behaviour for an ARIA menu button (arrow keys, Home/End,
 * Escape, Tab, outside click). The menu stays mounted while it animates out.
 */
export function useDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const { isMounted, state } = usePresence(isOpen, EXIT_MS);

    const rootRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const close = (restoreFocus = true) => {
        setIsOpen(false);
        if (restoreFocus) buttonRef.current?.focus();
    };

    const toggle = () => setIsOpen((open) => !open);

    // On open, focus the checked item (radio menus) or the first one
    useEffect(() => {
        if (!isOpen) return;
        const items = menuItems(menuRef.current);
        (items.find((el) => el.getAttribute("aria-checked") === "true") ?? items[0])?.focus();
    }, [isOpen]);

    // Close on outside click
    useEffect(() => {
        if (!isOpen) return;
        const onPointerDown = (event: PointerEvent) => {
            if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
        };
        document.addEventListener("pointerdown", onPointerDown);
        return () => document.removeEventListener("pointerdown", onPointerDown);
    }, [isOpen]);

    const onButtonKeyDown = (e: React.KeyboardEvent) => {
        if ((e.key === "ArrowDown" || e.key === "ArrowUp") && !isOpen) {
            e.preventDefault();
            setIsOpen(true);
        }
    };

    const onMenuKeyDown = (e: React.KeyboardEvent) => {
        const list = menuItems(menuRef.current);
        const index = list.indexOf(document.activeElement as HTMLElement);
        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                list[(index + 1) % list.length]?.focus();
                break;
            case "ArrowUp":
                e.preventDefault();
                list[(index - 1 + list.length) % list.length]?.focus();
                break;
            case "Home":
                e.preventDefault();
                list[0]?.focus();
                break;
            case "End":
                e.preventDefault();
                list[list.length - 1]?.focus();
                break;
            case "Escape":
                e.preventDefault();
                close();
                break;
            case "Tab":
                setIsOpen(false);
                break;
        }
    };

    return {
        isOpen,
        isMounted,
        state,
        rootRef,
        buttonRef,
        menuRef,
        close,
        toggle,
        onButtonKeyDown,
        onMenuKeyDown,
    };
}
