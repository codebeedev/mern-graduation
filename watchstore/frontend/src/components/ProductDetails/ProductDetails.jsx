import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import {
    clearErrors,
    getProductDetails,
    getSimilarProducts,
    newReview,
} from "../../actions/productAction";
import { NextBtn, PreviousBtn } from "../Home/Banner/Banner";
import ProductSlider from "../Home/ProductSlider/ProductSlider";
import Loader from "../Layouts/Loader";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import StarIcon from "@mui/icons-material/Star";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import CachedIcon from "@mui/icons-material/Cached";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import { addItemsToCart } from "../../actions/cartAction";
import { getDeliveryDate, getDiscount } from "../../utils/functions";
import {
    addToWishlist,
    removeFromWishlist,
} from "../../actions/wishlistAction";
import MinCategory from "../Layouts/MinCategory";
import MetaData from "../Layouts/MetaData";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import LoopIcon from "@mui/icons-material/Loop";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ThreeSixty from "react-360-view";
import ImageGallery from "react-image-gallery";
import ReactImageMagnify from "react-image-magnify";
const images = [
    {
        original: "https://picsum.photos/id/1018/1000/600/",
        thumbnail: "https://picsum.photos/id/1018/1000/600/",
    },
    {
        original: "https://picsum.photos/id/1015/1000/600/",
        thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
        original: "https://picsum.photos/id/1019/1000/600/",
        thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
];

const ProductDetails = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();
    const navigate = useNavigate();

    // reviews toggle
    const [open, setOpen] = useState(false);
    const [viewAll, setViewAll] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const { product, loading, error } = useSelector(
        (state) => state.productDetails
    );
    const { success, error: reviewError } = useSelector(
        (state) => state.newReview
    );
    const { cartItems } = useSelector((state) => state.cart);
    const { wishlistItems } = useSelector((state) => state.wishlist);

    const settings = {
        autoplay: true,
        autoplaySpeed: 2000,
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <PreviousBtn />,
        nextArrow: <NextBtn />,
    };

    const imageArr = product?.images?.map((item) => {
        return {
            original: item.url,
            thumbnail: item.url,
        };
    });

    const productId = params.id;
    const itemInWishlist = wishlistItems.some((i) => i.product === productId);

    const addToWishlistHandler = () => {
        if (itemInWishlist) {
            dispatch(removeFromWishlist(productId));
            enqueueSnackbar("Remove From Wishlist", { variant: "success" });
        } else {
            dispatch(addToWishlist(productId));
            enqueueSnackbar("Added To Wishlist", { variant: "success" });
        }
    };

    const reviewSubmitHandler = () => {
        if (rating === 0 || !comment.trim()) {
            enqueueSnackbar("Empty Review", { variant: "error" });
            return;
        }
        const formData = new FormData();
        formData.set("rating", rating);
        formData.set("comment", comment);
        formData.set("productId", productId);
        dispatch(newReview(formData));
        setOpen(false);
    };

    const addToCartHandler = () => {
        dispatch(addItemsToCart(productId));
        enqueueSnackbar("Product Added To Cart", { variant: "success" });
    };

    const handleDialogClose = () => {
        setOpen(!open);
    };

    const itemInCart = cartItems.some((i) => i.product === productId);

    const goToCart = () => {
        navigate("/cart");
    };

    const buyNow = () => {
        addToCartHandler();
        navigate("/shipping");
    };

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (reviewError) {
            enqueueSnackbar(reviewError, { variant: "error" });
            dispatch(clearErrors());
        }
        if (success) {
            enqueueSnackbar("Review Submitted Successfully", {
                variant: "success",
            });
            dispatch({ type: NEW_REVIEW_RESET });
        }
        dispatch(getProductDetails(productId));
        // eslint-disable-next-line
    }, [dispatch, productId, error, reviewError, success, enqueueSnackbar]);

    useEffect(() => {
        dispatch(getSimilarProducts(product?.category));
    }, [dispatch, product, product.category]);
    console.log(product.brand);
    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <MetaData title={product.name} />
                    <MinCategory />
                    <main className="mt-12 sm:mt-0">
                        {/* <!-- product image & description container --> */}
                        <div className="w-full h-auto flex flex-col pb-24 sm:flex-row bg-white  relative">
                            {/* <!-- image wrapper --> */}
                            <div className="w-full h-auto sm:w-2/5 sm:sticky top-16 sm:h-screen">
                                {/* <!-- imgbox --> */}
                                <div className="flex flex-col gap-3 m-3">
                                    <div className="w-full h-full pb-6 border relative">
                                        {/* <Slider {...settings}>
                                            {product.images &&
                                                product.images.map(
                                                    (item, i) => (
                                                        <ReactImageMagnify
                                                            {...{
                                                                smallImage: {
                                                                    alt: "Wristwatch by Ted Baker London",
                                                                    isFluidWidth: true,
                                                                    src: item.url,
                                                                },
                                                                largeImage: {
                                                                    src: item.url,
                                                                    width: 1200,
                                                                    height: 1800,
                                                                },
                                                            }}
                                                        />
                                                    )
                                                )}
                                        </Slider> */}
                                        <ImageGallery
                                            items={imageArr || images}
                                        ></ImageGallery>
                                        <div className="absolute top-4 right-4 shadow-lg bg-white w-9 h-9 border flex items-center justify-center rounded-full">
                                            <span
                                                onClick={addToWishlistHandler}
                                                className={`${
                                                    itemInWishlist
                                                        ? "text-red-500"
                                                        : "hover:text-red-500 text-gray-300"
                                                } cursor-pointer`}
                                            >
                                                <FavoriteIcon
                                                    sx={{ fontSize: "18px" }}
                                                />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- imgbox --> */}
                            </div>
                            {/* <!-- image wrapper --> */}

                            {/* <!-- product desc wrapper --> */}
                            <div className="flex-1 py-2 px-3">
                                {/* <!-- whole product description --> */}

                                <div className="flex flex-col gap-2 mb-4">
                                    <h2 className="text-xl">{product.name}</h2>
                                    {/* <!-- rating badge --> */}
                                    {/* <!-- seller details --> */}
                                    <div className="flex gap-16 my-2 items-center text-sm font-medium">
                                        <p className="text-gray-500">
                                            Thương hiệu
                                        </p>
                                        <Link
                                            className="font-medium text-primary-blue ml-3"
                                            to="/"
                                        >
                                            {product.brand &&
                                                product.brand.name}
                                        </Link>
                                    </div>
                                    {/* <!-- seller details --> */}
                                    <span className="text-sm text-gray-500 font-medium flex gap-2 items-center">
                                        <span className="text-xs px-1.5 py-0.5 bg-primary-blue rounded-sm text-white flex items-center gap-0.5">
                                            {product.ratings &&
                                                product.ratings.toFixed(1)}{" "}
                                            <StarIcon
                                                sx={{ fontSize: "12px" }}
                                            />
                                        </span>
                                        <span>
                                            {product.numOfReviews} Đánh giá
                                        </span>
                                    </span>
                                    {/* <!-- rating badge --> */}

                                    {/* <!-- price desc --> */}

                                    <div className="flex items-baseline gap-2 text-3xl font-medium mt-3">
                                        <span className="text-gray-800">
                                            {product.price?.toLocaleString()}{" "}
                                            VNĐ
                                        </span>
                                        <span className="text-base text-gray-500 line-through">
                                            {product.cuttedPrice?.toLocaleString()}{" "}
                                            VNĐ
                                        </span>
                                        <p className="text-base text-primary-blue">
                                            bạn tiết kiệm được{" "}
                                            {getDiscount(
                                                product.price,
                                                product.cuttedPrice
                                            )}{" "}
                                            %&nbsp;(
                                            {product.cuttedPrice -
                                                product.price}{" "}
                                            vnđ )
                                        </p>
                                    </div>
                                    {/* <!-- price desc --> */}
                                    <div className="w-full flex gap-3">
                                        {/* <!-- add to cart btn --> */}
                                        {product.stock > 0 && (
                                            <button
                                                onClick={
                                                    itemInCart
                                                        ? goToCart
                                                        : addToCartHandler
                                                }
                                                className="p-4 w-1/2 flex items-center justify-center gap-2 text-white bg-primary-blue rounded-sm shadow hover:shadow-lg"
                                            >
                                                <ShoppingCartIcon />
                                                {itemInCart
                                                    ? "ĐẾN GIỎ HÀNG"
                                                    : "THÊM VÀO GIỎ HÀNG"}
                                            </button>
                                        )}
                                        <button
                                            onClick={buyNow}
                                            disabled={
                                                product.stock < 1 ? true : false
                                            }
                                            className={
                                                product.stock < 1
                                                    ? "p-4 w-full flex items-center justify-center gap-2 text-white bg-red-600 cursor-not-allowed rounded-sm shadow hover:shadow-lg"
                                                    : "p-4 w-1/2 flex items-center justify-center gap-2 text-white bg-primary-orange rounded-sm shadow hover:shadow-lg"
                                            }
                                        >
                                            <FlashOnIcon />
                                            {product.stock < 1
                                                ? "HẾT HÀNG"
                                                : "MUA NGAY"}
                                        </button>
                                        {/* <!-- add to cart btn --> */}
                                    </div>
                                    {/* <!-- banks offers --> */}
                                    <div className="border border-red-300 p-4">
                                        <p className="text-md font-medium text-center mb-4">
                                            Chương trình khuyễn mãi
                                        </p>
                                        <div className="flex flex-col gap-4">
                                            <p className="text-sm flex items-center gap-1">
                                                <span className="">
                                                    <CardGiftcardIcon
                                                        sx={{
                                                            fontSize: "20px",
                                                        }}
                                                    />
                                                </span>
                                                <span className="font-medium ml-2">
                                                    Mua Online Với Nhiều Chương
                                                    Trình Ưu Đãi
                                                </span>{" "}
                                            </p>
                                            <p className="text-sm flex items-center gap-1">
                                                <span className="">
                                                    <LocalShippingIcon
                                                        sx={{
                                                            fontSize: "20px",
                                                        }}
                                                    />
                                                </span>
                                                <span className="font-medium ml-2">
                                                    Miễn phí vận chuyển trên
                                                    toàn quốc
                                                </span>{" "}
                                            </p>
                                            <p className="text-sm flex items-center gap-1">
                                                <span className="">
                                                    <VolunteerActivismIcon
                                                        sx={{
                                                            fontSize: "20px",
                                                        }}
                                                    />
                                                </span>
                                                <span className="font-medium ml-2">
                                                    Bảo hành chính hãng
                                                </span>{" "}
                                            </p>{" "}
                                            <p className="text-sm flex items-center gap-1">
                                                <span className="">
                                                    <LoopIcon
                                                        sx={{
                                                            fontSize: "20px",
                                                        }}
                                                    />
                                                </span>
                                                <span className="font-medium ml-2">
                                                    Đổi hàng miễn phí trong 7
                                                    ngày khi chưa sử dụng
                                                </span>{" "}
                                            </p>{" "}
                                            <p className="text-sm flex items-center gap-1">
                                                <span className="">
                                                    <CardGiftcardIcon
                                                        sx={{
                                                            fontSize: "20px",
                                                        }}
                                                    />
                                                </span>
                                                <span className="font-medium ml-2">
                                                    Tặng khăn lau & Giảm 50% cho
                                                    2 lần thay dây da đồng hồ
                                                    tiếp theo
                                                </span>{" "}
                                            </p>
                                        </div>
                                    </div>

                                    {/* <!-- banks offers --> */}

                                    {/* <!-- warranty & brand --> */}
                                    <div className="flex gap-8 mt-2 items-center text-sm">
                                        <img
                                            draggable="false"
                                            className="w-20 h-8 p-0.5 border object-contain"
                                            src={product.brand?.logo.url}
                                            alt={
                                                product.brand &&
                                                product.brand.name
                                            }
                                        />
                                        <span>
                                            {product.warranty} tháng bảo hành{" "}
                                            <Link
                                                className="font-medium text-primary-blue"
                                                to="/"
                                            >
                                                Tìm hiểu thêm
                                            </Link>
                                        </span>
                                    </div>
                                    {/* <!-- warranty & brand --> */}

                                    <div className="flex gap-16 mt-4 mr-6 items-stretch text-sm">
                                        <p className="text-gray-500 font-medium">
                                            Dịch vụ
                                        </p>
                                        <ul className="flex flex-col gap-2">
                                            <li>
                                                <p className="flex items-center gap-3">
                                                    <span className="">
                                                        <VerifiedUserIcon
                                                            sx={{
                                                                fontSize:
                                                                    "18px",
                                                            }}
                                                        />
                                                    </span>{" "}
                                                    Bảo hành chính hãng
                                                    {product.warranty} tháng.
                                                </p>
                                            </li>
                                            <li>
                                                <p className="flex items-center gap-3">
                                                    <span className="">
                                                        <CachedIcon
                                                            sx={{
                                                                fontSize:
                                                                    "18px",
                                                            }}
                                                        />
                                                    </span>{" "}
                                                    Đổi trả trong vòng 7 ngày
                                                </p>
                                            </li>
                                            <li>
                                                <p className="flex items-center gap-3">
                                                    <span className="">
                                                        <AttachMoneyIcon
                                                            sx={{
                                                                fontSize:
                                                                    "18px",
                                                            }}
                                                        />
                                                    </span>{" "}
                                                    Hỗ trợ trả góp
                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                    {/* <!-- highlights & services details --> */}

                                    {/* <!-- border box --> */}
                                    <div className="w-full mt-6 rounded-sm border flex flex-col">
                                        <h1 className="px-6 py-4 border-b text-2xl font-medium">
                                            Mô tả sản phẩm
                                        </h1>
                                        <div className="p-6">
                                            <p className="text-sm">
                                                {product.description}
                                            </p>
                                        </div>
                                    </div>
                                    {/* <!-- highlights & services details --> */}
                                    <div className="flex flex-col w-full sm:flex-row justify-between ml-8">
                                        {/* <!-- highlights details --> */}
                                        <div className="flex gap-8 mt-4 items-stretch text-sm">
                                            <p className="text-gray-500 font-medium w-[100px]">
                                                Điểm nổi bật
                                            </p>

                                            <ul className="list-none flex flex-col gap-2 w-[30rem]">
                                                {product.highlights?.map(
                                                    (highlight, i) => (
                                                        <li key={i}>
                                                            <p>{highlight}</p>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                        {/* <!-- highlights details --> */}

                                        {/* <!-- services details --> */}

                                        {/* <!-- services details --> */}
                                    </div>
                                    {/* <!-- border box --> */}

                                    {/* <!-- specifications border box --> */}
                                    <div className="w-full mt-4 pb-4 rounded-sm border flex flex-col">
                                        <h1 className="px-6 py-4 border-b text-2xl font-medium">
                                            Thông số kỹ thuật
                                        </h1>
                                        <h1 className="px-6 py-3 text-lg">
                                            Thông tin bổ sung
                                        </h1>

                                        {/* <!-- specs list --> */}
                                        {product.specifications?.map(
                                            (spec, i) => (
                                                <div
                                                    className="px-6 py-2 flex items-center text-sm"
                                                    key={i}
                                                >
                                                    <p className="text-gray-500 w-4/12">
                                                        {spec.title}
                                                    </p>
                                                    <p className="flex-1">
                                                        {spec.description}
                                                    </p>
                                                </div>
                                            )
                                        )}
                                        {/* <!-- specs list --> */}
                                    </div>
                                    {/* <!-- specifications border box --> */}

                                    {/* <!-- reviews border box --> */}

                                    {/* <!-- reviews border box --> */}
                                </div>
                            </div>
                            {/* <!-- product desc wrapper --> */}
                        </div>
                        {/* <!-- product image & description container --> */}
                        <div className="w-full mt-6 rounded-sm border flex flex-col bg-white">
                            <div className="flex justify-between items-center border-b px-6 py-4">
                                <h1 className="text-2xl font-medium">
                                    Đánh giá & Nhận xét
                                </h1>
                                <button
                                    onClick={handleDialogClose}
                                    className="shadow bg-primary-blue text-white px-4 py-2 rounded-sm hover:shadow-lg"
                                >
                                    Đánh giá sản phẩm
                                </button>
                            </div>

                            <Dialog
                                aria-labelledby="review-dialog"
                                open={open}
                                onClose={handleDialogClose}
                            >
                                <DialogTitle className="border-b">
                                    Nhận xét
                                </DialogTitle>
                                <DialogContent className="flex flex-col m-1 gap-4">
                                    <Rating
                                        onChange={(e) =>
                                            setRating(e.target.value)
                                        }
                                        value={rating}
                                        size="large"
                                        precision={0.5}
                                    />
                                    <TextField
                                        label="Nhận xét"
                                        multiline
                                        rows={3}
                                        sx={{ width: 400 }}
                                        size="small"
                                        variant="outlined"
                                        value={comment}
                                        onChange={(e) =>
                                            setComment(e.target.value)
                                        }
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <button
                                        onClick={handleDialogClose}
                                        className="py-2 px-6 rounded shadow bg-white border border-red-500 hover:bg-red-100 text-red-600 uppercase"
                                    >
                                        Huỷ
                                    </button>
                                    <button
                                        onClick={reviewSubmitHandler}
                                        className="py-2 px-6 rounded bg-green-600 hover:bg-green-700 text-white shadow uppercase"
                                    >
                                        Gửi
                                    </button>
                                </DialogActions>
                            </Dialog>

                            <div className="flex items-center border-b">
                                <h1 className="px-6 py-3 text-3xl font-semibold">
                                    {product.ratings &&
                                        product.ratings.toFixed(1)}
                                    <StarIcon />
                                </h1>
                                <p className="text-lg text-gray-500">
                                    ({product.numOfReviews}) Nhận xét
                                </p>
                            </div>

                            {viewAll
                                ? product.reviews
                                      ?.map((rev, i) => (
                                          <div
                                              className="flex flex-col gap-2 py-4 px-6 border-b"
                                              key={i}
                                          >
                                              <Rating
                                                  name="read-only"
                                                  value={rev.rating}
                                                  readOnly
                                                  size="small"
                                                  precision={0.5}
                                              />
                                              <p>{rev.comment}</p>
                                              <span className="text-sm text-gray-500">
                                                  by {rev.name}
                                              </span>
                                          </div>
                                      ))
                                      .reverse()
                                : product.reviews
                                      ?.slice(-3)
                                      .map((rev, i) => (
                                          <div
                                              className="flex flex-col gap-2 py-4 px-6 border-b"
                                              key={i}
                                          >
                                              <Rating
                                                  name="read-only"
                                                  value={rev.rating}
                                                  readOnly
                                                  size="small"
                                                  precision={0.5}
                                              />
                                              <p>{rev.comment}</p>
                                              <span className="text-sm text-gray-500">
                                                  by {rev.name}
                                              </span>
                                          </div>
                                      ))
                                      .reverse()}
                            {product.reviews?.length > 3 && (
                                <button
                                    onClick={() => setViewAll(!viewAll)}
                                    className="w-1/3 m-2 rounded-sm shadow hover:shadow-lg py-2 bg-primary-blue text-white"
                                >
                                    {viewAll ? "View Less" : "View All"}
                                </button>
                            )}
                        </div>
                        {/* Sliders */}
                        <div className="flex flex-col gap-3 mt-6">
                            <ProductSlider
                                title={"Sản phẩm cùng loại"}
                                tagline={""}
                                filterKey="category"
                                valueFilter={product.category}
                            />
                        </div>
                        <div className="flex flex-col gap-3 mt-6">
                            <ProductSlider
                                title={"Sản phẩm cùng thương hiệu"}
                                tagline={""}
                                filterKey="brand"
                                // valueFilter={product.brand.name || ""}
                            />
                        </div>
                    </main>
                </>
            )}
        </>
    );
};

export default ProductDetails;
