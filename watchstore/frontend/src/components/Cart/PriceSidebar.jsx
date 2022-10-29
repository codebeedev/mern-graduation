const PriceSidebar = ({ cartItems }) => {
    return (
        <div className="flex sticky top-16 sm:h-screen flex-col sm:w-4/12 sm:px-1">
            {/* <!-- nav tiles --> */}
            <div className="flex flex-col bg-white rounded-sm shadow">
                <h1 className="px-6 py-3 border-b font-medium text-gray-500">
                    THÔNG TIN ĐƠN HÀNG
                </h1>

                <div className="flex flex-col gap-4 p-6 pb-3">
                    <p className="flex justify-between">
                        Thành tiền ({cartItems.length} sản phẩm){" "}
                        <span>
                            {cartItems
                                .reduce(
                                    (sum, item) =>
                                        sum + item.cuttedPrice * item.quantity,
                                    0
                                )
                                .toLocaleString()}
                            VNĐ
                        </span>
                    </p>
                    <p className="flex justify-between">
                        Tiết kiệm{" "}
                        <span className="text-primary-blue">
                            -
                            {cartItems
                                .reduce(
                                    (sum, item) =>
                                        sum +
                                        (item.cuttedPrice * item.quantity -
                                            item.price * item.quantity),
                                    0
                                )
                                .toLocaleString()}
                            VNĐ
                        </span>
                    </p>
                    <p className="flex justify-between">
                        Chi phí vận chuyển{" "}
                        <span className="text-primary-blue">Miễn phí</span>
                    </p>

                    <div className="border border-dashed"></div>
                    <p className="flex justify-between text-lg font-medium">
                        Tổng tiền{" "}
                        <span>
                            {cartItems
                                .reduce(
                                    (sum, item) =>
                                        sum + item.price * item.quantity,
                                    0
                                )
                                .toLocaleString()}{" "}
                            VNĐ
                        </span>
                    </p>
                    <div className="border border-dashed"></div>
                </div>
            </div>
            {/* <!-- nav tiles --> */}
        </div>
    );
};

export default PriceSidebar;
