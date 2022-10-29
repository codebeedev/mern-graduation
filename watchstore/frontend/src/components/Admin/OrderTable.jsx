import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import {
    clearErrors,
    deleteOrder,
    getAllOrders,
} from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";
import Actions from "./Actions";
import { formatDate } from "../../utils/functions";
import MetaData from "../Layouts/MetaData";
import BackdropLoader from "../Layouts/BackdropLoader";
import moment from "moment";
const OrderTable = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { orders, error } = useSelector((state) => state.allOrders);
    const {
        loading,
        isDeleted,
        error: deleteError,
    } = useSelector((state) => state.order);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (deleteError) {
            enqueueSnackbar(deleteError, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isDeleted) {
            enqueueSnackbar("Deleted Successfully", { variant: "success" });
            dispatch({ type: DELETE_ORDER_RESET });
        }
        dispatch(getAllOrders());
    }, [dispatch, error, deleteError, isDeleted, enqueueSnackbar]);

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id));
    };
    console.log(orders);
    const columns = [
        {
            field: "id",
            headerName: "ID",
            minWidth: 200,
            flex: 1,
        },
        {
            field: "status",
            headerName: "Trạng thái",
            minWidth: 150,
            flex: 0.2,
            renderCell: (params) => {
                return (
                    <>
                        {params.row.status === "Delivered" ? (
                            <span className="text-sm bg-[#0ea5e9] p-1 px-2 font-medium rounded-full text-white">
                                Đã nhận hàng
                            </span>
                        ) : params.row.status === "Shipped" ? (
                            <span className="text-sm bg-[#22c55e] p-1 px-2 font-medium rounded-full text-white">
                                Đã gửi hàng
                            </span>
                        ) : params.row.status === "Processing" ? (
                            <span className="text-sm bg-[#f97316] p-1 px-2 font-medium rounded-full text-white">
                                Đang xử lý
                            </span>
                        ) : (
                            <span className="text-sm bg-[#dc2626] p-1 px-2 font-medium rounded-full text-white">
                                Đơn đã huỷ
                            </span>
                        )}
                    </>
                );
            },
        },
        {
            field: "itemsQty",
            headerName: "Số lượng SP",
            type: "number",
            minWidth: 100,
            flex: 0.1,
        },
        {
            field: "amount",
            headerName: "Tổng tiền",
            type: "number",
            minWidth: 200,
            flex: 0.2,
            renderCell: (params) => {
                return <span>{params.row.amount.toLocaleString()}</span>;
            },
        },
        {
            field: "orderOn",
            headerName: "Ngày",
            type: "date",
            minWidth: 200,
            flex: 0.5,
        },
        {
            field: "actions",
            headerName: "",
            minWidth: 100,
            flex: 0.3,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Actions
                            editRoute={"order"}
                            deleteHandler={deleteOrderHandler}
                            id={params.row.id}
                        />
                    </>
                );
            },
        },
    ];

    const rows = [];

    orders &&
        orders.forEach((order) => {
            rows.unshift({
                id: order._id,
                itemsQty: order.orderItems.length,
                amount: order.totalPrice,
                orderOn: moment(order.createdAt).format("DD/MM/YYYY"),
                status: order.orderStatus,
            });
        });

    return (
        <>
            {loading && <BackdropLoader />}

            <h1 className="text-lg font-medium uppercase">
                Danh sách đơn hàng
            </h1>
            <div
                className="bg-white rounded-xl shadow-lg w-full"
                style={{ height: 470 }}
            >
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectIconOnClick
                    sx={{
                        boxShadow: 0,
                        border: 0,
                    }}
                />
            </div>
        </>
    );
};

export default OrderTable;
