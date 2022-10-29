import { Link } from "react-router-dom";

const EmptyCart = () => {
    return (
        <div className="flex items-center flex-col gap-2 m-6">
            <div className="w-52 h-44">
                <img
                    draggable="false"
                    className="w-full h-full object-contain"
                    src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/9bdd8040b334d31946f49e36beaf32db.png"
                    alt="Empty Cart"
                />
            </div>
            <span className="text-lg">Giỏ hàng của bạn đang trống!</span>

            <Link
                to="/products"
                className="bg-primary-blue text-sm text-white px-12 py-2 rounded-sm shadow mt-3"
            >
                Xem danh sách sản phẩm
            </Link>
        </div>
    );
};

export default EmptyCart;
