import { lazy } from "react";

const Verify = lazy(() => import("../pages/Verify"))

const NormalRoutes = [
    {
        path: "/verify/:asset_hash/:cid",
        component: Verify,
    },
]

export default NormalRoutes