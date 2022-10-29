import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    clearErrors,
    getOrderDetails,
    updateOrder,
} from "../../actions/orderAction";
import Loader from "../Layouts/Loader";
import TrackStepper from "./TrackStepper";
import MinCategory from "../Layouts/MinCategory";
import MetaData from "../Layouts/MetaData";
import { formatNumber } from "../../utils/functions";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { useState } from "react";
const OrderDetails = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();

    const { order, error, loading } = useSelector(
        (state) => state.orderDetails
    );

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        dispatch(getOrderDetails(params.id));
    }, [dispatch, error, params.id, enqueueSnackbar]);
    console.log(order);

    const handleCancelOrder = (e) => {
        const formData = new FormData();
        formData.set("status", "Cancel");
        dispatch(updateOrder(params.id, formData));
        enqueueSnackbar("Huỷ đơn hàng thành công", {
            variant: "success",
        });
        setOpen(false);
    };
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    console.log(order);
    return (
        <>
            <MinCategory />
            <main className="w-full mt-14 sm:mt-4">
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {"Huỷ đơn hàng?"}
                            </DialogTitle>
                            <DialogContent>
                                <p className="text-gray-500">
                                    Bạn có muốn huỷ đơn hàng này ?
                                </p>
                            </DialogContent>
                            <DialogActions>
                                <button
                                    onClick={handleClose}
                                    className="py-2 px-6 rounded shadow bg-gray-400 hover:bg-gray-500 text-white"
                                >
                                    No
                                </button>
                                <button
                                    onClick={handleCancelOrder}
                                    className="py-2 px-6 ml-4 rounded bg-red-600 hover:bg-red-700 text-white shadow"
                                >
                                    Yes
                                </button>
                            </DialogActions>
                        </Dialog>
                        {order && order.user && order.shippingInfo && (
                            <div className="flex flex-col gap-4 max-w-6xl mx-auto">
                                <div className="flex bg-white shadow rounded-sm min-w-full">
                                    <div className="sm:w-1/2 border-r">
                                        <div className="flex flex-col gap-3 my-8 mx-10">
                                            <h3 className="font-medium text-lg">
                                                Thông tin đơn hàng
                                            </h3>
                                            <h4 className="font-medium">
                                                Người nhận: {order.user.name}
                                            </h4>
                                            <p className="text-sm">{`Địa chỉ: ${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state} - ${order.shippingInfo.pincode}`}</p>
                                            <div className="flex gap-2 text-sm">
                                                <p className="font-medium">
                                                    Email:
                                                </p>
                                                <p>{order.user.email}</p>
                                            </div>
                                            <div className="flex gap-2 text-sm">
                                                <p className="font-medium">
                                                    Số điện thoại
                                                </p>
                                                <p>
                                                    {order.shippingInfo.phoneNo}
                                                </p>
                                            </div>
                                            <div className="flex gap-2 text-sm">
                                                <p className="font-medium">
                                                    Tổng tiền
                                                </p>
                                                <p>
                                                    {formatNumber(
                                                        order.totalPrice
                                                    )}{" "}
                                                    vnđ
                                                </p>
                                            </div>
                                            <div className="flex gap-2 text-sm">
                                                <p className="font-medium">
                                                    Phương thức thanh toán:
                                                </p>
                                                <p>
                                                    {order.isPaid
                                                        ? "Paypal"
                                                        : "Thanh toán khi nhận hàng"}
                                                </p>
                                            </div>
                                            {order.orderStatus ===
                                                "Processing" && (
                                                <button
                                                    onClick={() =>
                                                        setOpen(true)
                                                    }
                                                    className="bg-red-400 p-2.5 text-white font-medium rounded shadow hover:shadow-lg"
                                                >
                                                    Huỷ đơn hàng
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex flex-col w-full sm:w-1/2 justify-center">
                                        <h3 className="font-medium sm:text-center">
                                            Trạng thái đơn hàng
                                        </h3>
                                        <TrackStepper
                                            orderOn={order.createdAt}
                                            shippedAt={order.shippedAt}
                                            deliveredAt={order.deliveredAt}
                                            activeStep={
                                                order.orderStatus ===
                                                "Delivered"
                                                    ? 2
                                                    : order.orderStatus ===
                                                      "Shipped"
                                                    ? 1
                                                    : 0
                                            }
                                        />
                                    </div>
                                </div>

                                {order.orderItems &&
                                    order.orderItems.map((item) => {
                                        const {
                                            _id,
                                            image,
                                            name,
                                            price,
                                            quantity,
                                        } = item;

                                        return (
                                            <div
                                                className="flex flex-col sm:flex-row min-w-full shadow rounded-sm bg-white px-2 py-5"
                                                key={_id}
                                            >
                                                <div className="flex flex-col sm:flex-row sm:w-1/2 gap-2">
                                                    <div className="w-full sm:w-32 h-20">
                                                        <img
                                                            draggable="false"
                                                            className="h-full w-full object-contain"
                                                            src={image}
                                                            alt={name}
                                                        />
                                                    </div>
                                                    <div className="flex flex-col gap-1 overflow-hidden">
                                                        <p className="text-sm">
                                                            {name.length > 60
                                                                ? `${name.substring(
                                                                      0,
                                                                      60
                                                                  )}...`
                                                                : name}
                                                        </p>
                                                        <p className="text-xs text-gray-600 mt-2">
                                                            Số lượng: {quantity}
                                                        </p>
                                                        <p className="text-xs text-gray-600">
                                                            Giá:{" "}
                                                            {formatNumber(
                                                                price
                                                            )}{" "}
                                                            vnđ
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        )}
                    </>
                )}
            </main>
        </>
    );
};

export default OrderDetails;
