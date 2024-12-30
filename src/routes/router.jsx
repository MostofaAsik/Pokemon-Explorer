import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import ViewDetails from "../components/ViewDetails";
import Favourites from "../pages/Favourites";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/pokemon/:name",
                element: <ViewDetails />,
            },
            {
                path: "/favorites",
                element: <Favourites />,
            }
        ],
    },
]);
export default router;