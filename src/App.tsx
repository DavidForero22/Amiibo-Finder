import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { AmiiboProvider } from "./context/AmiiboContext";
import { ThemeProvider } from "./context/ThemeContext";
import { FilterProvider } from "./context/FilterContext";
import BaseLayout from "./layouts/BaseLayout";
import Home from "./pages/Collection";
import Unlock from "./pages/Unlock";
import { ToastProvider } from "./context/ToastContext";

/**
 * Routing configuration. A data router, so links marked `viewTransition`
 * animate between pages (the room glides, the gift fades in and out).
 */
const router = createBrowserRouter([
    {
        element: (
            <BaseLayout>
                <Outlet />
            </BaseLayout>
        ),
        children: [
            /* Main Collection Page */
            { path: "/", element: <Home /> },

            /* Unlock/Gacha Page */
            { path: "/unlock", element: <Unlock /> },
        ],
    },
]);

/**
 * Root component of the application.
 * * * Responsibilities:
 * 1. Composes all Global Context Providers (Theme, Data, Filters, Toasts).
 * 2. Provides the router, whose layout route applies the BaseLayout structure.
 */
function App() {
    return (
        /* Global State Providers */
        <ThemeProvider>
            <AmiiboProvider>
                <FilterProvider>
                    <ToastProvider>
                        <RouterProvider router={router} />
                    </ToastProvider>
                </FilterProvider>
            </AmiiboProvider>
        </ThemeProvider>
    );
}

export default App;
