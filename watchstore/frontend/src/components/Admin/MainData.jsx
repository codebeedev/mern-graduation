import { useEffect } from "react";
import Chart from "chart.js/auto";
import { Doughnut, Line, Pie, Bar } from "react-chartjs-2";
import { getAdminProducts } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrders } from "../../actions/orderAction";
import { getAllUsers } from "../../actions/userAction";
import { categories } from "../../utils/constants";
import MetaData from "../Layouts/MetaData";

const MainData = () => {
    const dispatch = useDispatch();

    const { products } = useSelector((state) => state.products);
    const { orders } = useSelector((state) => state.allOrders);
    const { users } = useSelector((state) => state.users);
    console.log(orders);
    let outOfStock = 0;

    products?.forEach((item) => {
        if (item.stock === 0) {
            outOfStock += 1;
        }
    });

    useEffect(() => {
        dispatch(getAdminProducts());
        dispatch(getAllOrders());
        dispatch(getAllUsers());
    }, [dispatch]);

    let totalAmount = orders
        ?.filter((item) => item.orderStatus !== "Cancel")
        .reduce((total, order) => total + order.totalPrice, 0);
    let totalOrderSuccess = orders?.filter(
        (item) => item.orderStatus !== "Cancel"
    );
    const months = [
        "Tháng 1",
        "Tháng 2",
        "Tháng 3",
        "Tháng 4",
        "Tháng 5",
        "Tháng 6",
        "Tháng 7",
        "Tháng 8",
        "Tháng 9",
        "Tháng 10",
        "Tháng 11",
        "Tháng 12",
    ];
    const date = new Date();
    const lineState = {
        labels: months,
        datasets: [
            {
                label: `Doanh thu`,
                borderColor: "#3b82f6",
                backgroundColor: "#bfdbfe",
                data: months.map((m, i) =>
                    orders
                        ?.filter(
                            (od) =>
                                new Date(od.createdAt).getMonth() === i &&
                                new Date(od.createdAt).getFullYear() ===
                                    date.getFullYear() &&
                                od.orderStatus !== "Cancel"
                        )
                        .reduce((total, od) => total + od.totalPrice, 0)
                ),
                yAxisID: "y",
            },
            {
                label: `Số lượng đơn hàng`,
                borderColor: "#166534",
                backgroundColor: "#bfdbfe",
                yAxisID: "y1",
                data: months.map(
                    (m, i) =>
                        orders?.filter(
                            (od) =>
                                new Date(od.createdAt).getMonth() === i &&
                                new Date(od.createdAt).getFullYear() ===
                                    date.getFullYear() &&
                                od.orderStatus !== "Cancel"
                        ).length
                ),
            },
        ],
    };

    // Order status
    const lineState2 = {
        labels: months,
        datasets: [
            {
                label: `Số lượng đơn đã nhận`,
                borderColor: "#0284c7",
                backgroundColor: "#bfdbfe",
                data: months.map(
                    (m, i) =>
                        orders?.filter(
                            (od) =>
                                new Date(od.createdAt).getMonth() === i &&
                                new Date(od.createdAt).getFullYear() ===
                                    date.getFullYear() &&
                                od.orderStatus === "Delivered"
                        ).length
                ),
            },
            {
                label: `Số lượng đặt đang giao`,
                borderColor: "#059669",
                backgroundColor: "#bfdbfe",
                data: months.map(
                    (m, i) =>
                        orders?.filter(
                            (od) =>
                                new Date(od.createdAt).getMonth() === i &&
                                new Date(od.createdAt).getFullYear() ===
                                    date.getFullYear() &&
                                od.orderStatus === "Shipped"
                        ).length
                ),
            },
            {
                label: `SL đơn đang xử lý`,
                borderColor: "#f59e0b",
                backgroundColor: "#bfdbfe",
                data: months.map(
                    (m, i) =>
                        orders?.filter(
                            (od) =>
                                new Date(od.createdAt).getMonth() === i &&
                                new Date(od.createdAt).getFullYear() ===
                                    date.getFullYear() &&
                                od.orderStatus === "Processing"
                        ).length
                ),
            },
            {
                label: `Đơn đã huỷ`,
                borderColor: "#dc2626",
                backgroundColor: "#bfdbfe",
                data: months.map(
                    (m, i) =>
                        orders?.filter(
                            (od) =>
                                new Date(od.createdAt).getMonth() === i &&
                                new Date(od.createdAt).getFullYear() ===
                                    date.getFullYear() &&
                                od.orderStatus === "Cancel"
                        ).length
                ),
            },
        ],
    };

    const statuses = ["Processing", "Shipped", "Delivered"];

    const pieState = {
        labels: statuses,
        datasets: [
            {
                backgroundColor: ["#9333ea", "#facc15", "#4ade80"],
                hoverBackgroundColor: ["#a855f7", "#fde047", "#86efac"],
                data: statuses.map(
                    (status) =>
                        orders?.filter((item) => item.orderStatus === status)
                            .length
                ),
            },
        ],
    };

    const doughnutState = {
        labels: ["Out of Stock", "In Stock"],
        datasets: [
            {
                backgroundColor: ["#ef4444", "#22c55e"],
                hoverBackgroundColor: ["#dc2626", "#16a34a"],
                data: [outOfStock, products.length - outOfStock],
            },
        ],
    };

    const barState = {
        labels: categories,
        datasets: [
            {
                label: "Số lượng sản phẩm:",
                borderColor: "#2dd4bf",
                backgroundColor: "#2dd4bf",
                hoverBackgroundColor: "#99f6e4",
                data: categories.map(
                    (cat) =>
                        products?.filter((item) => item.category === cat).length
                ),
            },
        ],
    };

    // console.log(orders.map((item) => item.orderItems));
    // categories.map(
    //     (cat) =>
    //         products?.filter((item) => item.category === cat).length
    // )
    const newArr = orders?.map((item) => item.orderItems);
    console.log(newArr?.flat());
    const options1 = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: "Biểu đồ thể hiện doanh thu theo từng tháng",
            },
        },
        scales: {
            y: {
                type: "linear",
                display: true,
                position: "left",
            },
            y1: {
                type: "linear",
                display: true,
                position: "right",
                grid: {
                    drawOnChartArea: false,
                },
            },
        },
    };
    const options2 = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: "Biểu đồ thể hiện số lượng sản phẩm theo từng danh mục",
            },
        },
    };

    const options3 = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: "Biểu đồ thể hiện trạng thái đơn hàng",
            },
        },
    };
    return (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-6">
                <div className="flex flex-col bg-[#60a5fa] text-white gap-2 rounded-xl shadow-lg hover:shadow-xl p-6">
                    <h4 className="text-gray-100 font-medium">
                        Tổng doanh thu
                    </h4>
                    <h2 className="text-2xl font-bold">
                        {totalAmount?.toLocaleString()} đ
                    </h2>
                </div>
                <div className="flex flex-col bg-[#818cf8] text-white gap-2 rounded-xl shadow-lg hover:shadow-xl p-6">
                    <h4 className="text-gray-100 font-medium">
                        Tổng SL đơn hàng thành công
                    </h4>
                    <h2 className="text-2xl font-bold">
                        {totalOrderSuccess?.length}
                    </h2>
                </div>
                <div className="flex flex-col bg-[#a78bfa] text-white gap-2 rounded-xl shadow-lg hover:shadow-xl p-6">
                    <h4 className="text-gray-100 font-medium">
                        Tổng số lượng sản phẩm
                    </h4>
                    <h2 className="text-2xl font-bold">{products?.length}</h2>
                </div>
                <div className="flex flex-col bg-[#f472b6] text-white gap-2 rounded-xl shadow-lg hover:shadow-xl p-6">
                    <h4 className="text-gray-100 font-medium">
                        Tổng số lượng User
                    </h4>
                    <h2 className="text-2xl font-bold">{users?.length}</h2>
                </div>
            </div>

            <div className="flex flex-col sm:justify-between gap-3 sm:gap-8 min-w-full">
                <div className="bg-white rounded-xl h-auto w-full shadow-lg p-2">
                    <Line options={options1} data={lineState} />
                </div>
            </div>

            <div className="flex flex-col sm:justify-between gap-3 sm:gap-8 min-w-full">
                <div className="bg-white rounded-xl h-auto w-full shadow-lg p-2">
                    <Line options={options3} data={lineState2} />
                </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-8 min-w-full mb-6">
                <div className="bg-white rounded-xl h-auto w-full shadow-lg p-2">
                    <Bar options={options2} data={barState} />
                </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-8 min-w-full mb-6">
                {/* <div className="bg-white rounded-xl shadow-lg p-4 text-center">
                    <span className="font-medium uppercase text-gray-800">
                        Stock Status
                    </span>
                    <Doughnut data={doughnutState} />
                </div>
                <div className="bg-white rounded-xl shadow-lg p-4 text-center">
                    <span className="font-medium uppercase text-gray-800">
                        Order Status
                    </span>
                    <Pie data={pieState} />
                </div> */}
            </div>
        </>
    );
};

export default MainData;
