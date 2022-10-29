import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    clearErrors,
    getOrderDetails,
    updateOrder,
} from "../../actions/orderAction";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import { formatDate } from "../../utils/functions";
import TrackStepper from "../Order/TrackStepper";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import moment from "moment";
import CartItem from "../Cart/CartItem";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

const UpdateOrder = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();

    const [status, setStatus] = useState("");

    const { order, error, loading } = useSelector(
        (state) => state.orderDetails
    );
    const { isUpdated, error: updateError } = useSelector(
        (state) => state.order
    );

    const cartItems = [];

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (updateError) {
            enqueueSnackbar(updateError, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isUpdated) {
            enqueueSnackbar("Order Updates Successfully", {
                variant: "success",
            });
            dispatch({ type: UPDATE_ORDER_RESET });
        }
        dispatch(getOrderDetails(params.id));
    }, [dispatch, error, params.id, isUpdated, updateError, enqueueSnackbar]);

    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set("status", status);
        console.log(formData.values);
        console.log(params.id);
        dispatch(updateOrder(params.id, formData));
    };

    const handleCancelOrder = (e) => {
        const formData = new FormData();
        formData.set("status", "Cancel");
        dispatch(updateOrder(params.id, formData));
        setOpen(false);
    };
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    console.log(order);
    return (
        <>
            {loading ? (
                <Loading />
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
                        <div className="flex flex-col gap-4">
                            <Link
                                to="/admin/orders"
                                className="ml-1 flex items-center gap-0 font-medium text-primary-blue uppercase"
                            >
                                <ArrowBackIosIcon sx={{ fontSize: "18px" }} />
                                Trở lại
                            </Link>

                            <div className="flex flex-wrap flex-col sm:flex-row bg-white shadow-lg rounded-lg min-w-full">
                                <div className="sm:w-1/2 border-r">
                                    <div className="flex flex-col gap-3 my-8 mx-10">
                                        <h3 className="font-medium text-lg">
                                            Thông tin khách hàng{" "}
                                        </h3>
                                        <h4 className="font-medium">
                                            Họ tên: {order.user.name}
                                        </h4>
                                        <p className="text-sm">
                                            Địa chỉ:{" "}
                                            {`${order.shippingInfo.address}, ${order.shippingInfo.city}, `}
                                        </p>
                                        <div className="flex gap-2 text-sm">
                                            <p className="font-medium">
                                                Email:
                                            </p>
                                            <p>{order.user.email}</p>
                                        </div>
                                        <div className="flex gap-2 text-sm">
                                            <p className="font-medium">
                                                Số điện thoại:
                                            </p>
                                            <p>{order.shippingInfo.phoneNo}</p>
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
                                    </div>
                                </div>

                                <form
                                    onSubmit={updateOrderSubmitHandler}
                                    className="flex flex-col gap-3 p-8"
                                >
                                    <h3 className="font-medium text-lg">
                                        Trạng thái đơn hàng
                                    </h3>
                                    <div className="flex gap-2">
                                        <p className="text-sm font-medium">
                                            Trạng thái hiện tại:
                                        </p>
                                        <p className="text-sm">
                                            {order.orderStatus === "Shipped" &&
                                                `Đã gửi đơn hàng vào lúc ${moment(
                                                    order.shippedAt
                                                ).format("DD/MM/YYYY")}`}
                                            {order.orderStatus ===
                                                "Processing" &&
                                                `Đơn hàng đang xử lý`}
                                            {order.orderStatus ===
                                                "Delivered" && `Đã nhận hàng`}
                                        </p>
                                    </div>
                                    <FormControl
                                        fullWidth
                                        sx={{ marginTop: 1 }}
                                    >
                                        <InputLabel id="order-status-select-label">
                                            Trạng thái
                                        </InputLabel>
                                        <Select
                                            labelId="order-status-select-label"
                                            id="order-status-select"
                                            value={status}
                                            label="Status"
                                            onChange={(e) =>
                                                setStatus(e.target.value)
                                            }
                                        >
                                            {order.orderStatus ===
                                                "Shipped" && (
                                                <MenuItem value={"Delivered"}>
                                                    Đã nhận hàng
                                                </MenuItem>
                                            )}
                                            {order.orderStatus ===
                                                "Processing" && (
                                                <MenuItem value={"Shipped"}>
                                                    Đang giao
                                                </MenuItem>
                                            )}
                                            {order.orderStatus ===
                                                "Delivered" && (
                                                <MenuItem value={"Delivered"}>
                                                    Đã nhận
                                                </MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                    <button
                                        type="submit"
                                        className="bg-primary-blue p-2.5 text-white font-medium rounded shadow hover:shadow-lg"
                                    >
                                        Cập nhật
                                    </button>
                                </form>
                                {order.orderStatus === "Processing" && (
                                    <button
                                        onClick={() => setOpen(true)}
                                        className="bg-red-400 p-2.5 text-white font-medium rounded shadow hover:shadow-lg"
                                    >
                                        Huỷ đơn hàng
                                    </button>
                                )}
                                <div className="sm:w-full border-r">
                                    <div className="flex flex-col gap-3 my-8 mx-10">
                                        <h3 className="font-medium text-lg">
                                            Danh sách sản phẩm{" "}
                                        </h3>
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
                                                        className="flex flex-col sm:flex-row min-w-full shadow-lg rounded-lg bg-white px-2 py-5"
                                                        key={_id}
                                                    >
                                                        <div className="flex flex-col sm:flex-row sm:w-1/2 gap-1">
                                                            <div className="w-full sm:w-32 h-24">
                                                                <img
                                                                    draggable="false"
                                                                    className="h-full w-full object-contain"
                                                                    src={image}
                                                                    alt={name}
                                                                />
                                                            </div>
                                                            <div className="flex flex-col gap-1 overflow-hidden">
                                                                <p className="text-sm">
                                                                    {name.length >
                                                                    45
                                                                        ? `${name.substring(
                                                                              0,
                                                                              45
                                                                          )}...`
                                                                        : name}
                                                                </p>
                                                                <p className="text-xs text-gray-600 mt-2">
                                                                    Số lượng:{" "}
                                                                    {quantity}
                                                                </p>
                                                                <p className="text-xs text-gray-600">
                                                                    Giá:
                                                                    {price.toLocaleString()}{" "}
                                                                    vnđ
                                                                </p>
                                                                <span className="font-medium">
                                                                    Tổng tiền:
                                                                    {(
                                                                        quantity *
                                                                        price
                                                                    ).toLocaleString()}{" "}
                                                                    vnđ
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default UpdateOrder;
