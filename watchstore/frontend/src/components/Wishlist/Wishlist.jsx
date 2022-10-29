import { useSelector } from "react-redux";
import MetaData from "../Layouts/MetaData";
import MinCategory from "../Layouts/MinCategory";
import Sidebar from "../User/Sidebar";
import Product from "./Product";
import { Link } from "react-router-dom";

const Wishlist = () => {
    const { wishlistItems } = useSelector((state) => state.wishlist);

    return (
        <>
            <MinCategory />
            <main className="w-full mt-12 sm:mt-0">
                <div className="flex gap-3.5 sm:w-11/12 sm:mt-4 m-auto mb-7">
                    <Sidebar activeTab={"wishlist"} />

                    <div className="flex-1 shadow bg-white">
                        {/* <!-- wishlist container --> */}
                        <div className="flex flex-col">
                            <span className="font-medium text-lg px-4 sm:px-8 py-4 border-b">
                                Danh sách yêu thích ({wishlistItems.length})
                            </span>

                            {wishlistItems.length === 0 && (
                                <div className="flex items-center flex-col gap-2 m-6">
                                    <img
                                        draggable="false"
                                        className="object-contain"
                                        src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/9bdd8040b334d31946f49e36beaf32db.png"
                                        alt="Empty Wishlist"
                                    />

                                    <p>
                                        Bạn không có sản phẩm nào hết. Hãy đi
                                        mua nào !
                                    </p>
                                    <Link
                                        to="/products"
                                        className="bg-primary-blue text-sm text-white px-12 py-2 rounded-sm shadow mt-3"
                                    >
                                        Xem danh sách sản phẩm
                                    </Link>
                                </div>
                            )}

                            {wishlistItems
                                .map((item, index) => (
                                    <Product {...item} key={index} />
                                ))
                                .reverse()}
                        </div>
                        {/* <!-- wishlist container --> */}
                    </div>
                </div>
            </main>
        </>
    );
};

export default Wishlist;
