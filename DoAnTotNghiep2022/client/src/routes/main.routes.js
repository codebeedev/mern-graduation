import { lazy } from "react";

// const Home = lazy(() => import("../pages/Home"))
const Marketplace = lazy(() => import("../pages/Marketplace"))
const Profile = lazy(() => import("../pages/Profile"))
const DetailNFT = lazy(() => import("../pages/Detail.NFT"))
const DetailMarketNFT = lazy(() => import("../pages/Detail.Market.NFT"))
const TrangChu = lazy(() => import("../pages/TrangChu"))

const MainRoutes = [
    {
        path: "/home",
        component: TrangChu,
    },
    {
        path: "/marketplace",
        component: Marketplace,
    },
    {
        path: "/profile",
        component: Profile,
    },
    {
        path: "/detail-nft/:id",
        component: DetailNFT,
    },
    {
        path: "/detail-market-nft/:id/:mode",
        component: DetailMarketNFT,
    },
]

export default MainRoutes