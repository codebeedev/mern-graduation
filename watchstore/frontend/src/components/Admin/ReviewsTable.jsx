import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import {
    clearErrors,
    deleteReview,
    getAllReviews,
} from "../../actions/productAction";
import { deleteProduct, getAdminProducts } from "../../actions/productAction";
import Rating from "@mui/material/Rating";
import Actions from "./Actions";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

import MetaData from "../Layouts/MetaData";
import BackdropLoader from "../Layouts/BackdropLoader";

const ReviewsTable = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [productId, setProductId] = useState("");

    const { reviews, error } = useSelector((state) => state.reviews);
    const { products } = useSelector((state) => state.products);

    const {
        loading,
        isDeleted,
        error: deleteError,
    } = useSelector((state) => state.review);

    useEffect(() => {
        if (productId.length === 24) {
            dispatch(getAllReviews(productId));
        }
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (deleteError) {
            enqueueSnackbar(deleteError, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isDeleted) {
            enqueueSnackbar("Review Deleted Successfully", {
                variant: "success",
            });
            dispatch({ type: DELETE_REVIEW_RESET });
        }
    }, [dispatch, error, deleteError, isDeleted, productId, enqueueSnackbar]);

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
            enqueueSnackbar("Product Deleted Successfully", {
                variant: "success",
            });
            dispatch({ type: DELETE_PRODUCT_RESET });
        }
        dispatch(getAdminProducts());
    }, [dispatch, error, deleteError, isDeleted, enqueueSnackbar]);
    const deleteReviewHandler = (id) => {
        dispatch(deleteReview(id.id, id.productID));
        console.log(id);
    };
    const arrReview = products
        .filter((item) => item.reviews.length > 0)
        .map((item) => {
            return {
                id: item._id,
                name: item.name,
                reviews: item.reviews,
            };
        });
    const finalArr = arrReview.map((item) => {
        return item.reviews.map((e) => {
            return {
                productID: item.id,
                productName: item.name,
                userName: e.name,
                userID: e.user,
                rating: e.rating,
                comment: e.comment,
                id: e._id,
            };
        });
    });
    console.log(finalArr.flat());
    const allReview = products.map((product) => {
        return product.reviews;
    });

    const newReview = allReview.flat();
    // console.log(allReview);
    // console.log(newReview);
    const columns = [
        {
            field: "productID",
            headerName: "ID sản phẩm",
            minWidth: 200,
            flex: 0.5,
        },
        {
            field: "productName",
            headerName: "Tên sản phẩm",
            minWidth: 200,
            flex: 0.5,
        },
        {
            field: "id",
            headerName: "Review ID",
            minWidth: 200,
            flex: 0.5,
        },
        {
            field: "userName",
            headerName: "Người dùng",
            minWidth: 150,
            flex: 0.5,
        },
        {
            field: "rating",
            headerName: "Đánh giá",
            type: "number",
            minWidth: 150,
            flex: 0.3,
            align: "left",
            headerAlign: "left",
            renderCell: (params) => {
                return (
                    <Rating
                        readOnly
                        value={params.row.rating}
                        size="small"
                        precision={0.5}
                    />
                );
            },
        },
        {
            field: "comment",
            headerName: "Nhận xét",
            minWidth: 200,
            flex: 0.5,
        },
        {
            field: "actions",
            headerName: "Actions",
            minWidth: 150,
            flex: 0.3,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Actions
                        editRoute={"review"}
                        deleteHandler={deleteReviewHandler}
                        id={params.row}
                    />
                );
            },
        },
    ];

    const rows = finalArr.flat();

    // finalArr.flat() &&
    //     finalArr.flat().forEach((rev) => {
    //         rows.push({
    //             id: rev._id,
    //             rating: rev.rating,
    //             comment: rev.comment,
    //             user: rev.name,
    //         });
    //     });

    console.log(rows);
    return (
        <>
            {loading && <BackdropLoader />}
            <div className="flex justify-between items-center gap-2 sm:gap-12">
                <h1 className="text-lg font-medium uppercase">
                    Danh sách nhận xét
                </h1>
            </div>
            <div
                className="bg-white rounded-xl shadow-lg w-full"
                style={{ height: 450 }}
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

export default ReviewsTable;
