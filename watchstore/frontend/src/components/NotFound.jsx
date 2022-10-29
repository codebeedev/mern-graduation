import notFound from "../assets/images/404-not-found.svg";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="mt-16 flex flex-col gap-4 items-center justify-center">
            <img
                draggable="false"
                className="sm:w-1/3 "
                src="https://deo.shopeemobile.com/shopee/shopee-mall-live/images/ic_no_404@2x.png"
                alt="Page Not Found"
            />

            <p className="text-6xl">404</p>
            <Link
                to="/"
                className="px-4 py-2 bg-primary-blue rounded-sm uppercase shadow hover:shadow-lg text-white"
            >
                Trở lại
            </Link>
        </div>
    );
};

export default NotFound;
