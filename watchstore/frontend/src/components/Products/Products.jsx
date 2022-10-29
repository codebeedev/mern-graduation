import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Pagination from "@mui/material/Pagination";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Slider from "@mui/material/Slider";
import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearErrors, getProducts } from "../../actions/productAction";
import Loader from "../Layouts/Loader";
import MinCategory from "../Layouts/MinCategory";
import Product from "./Product";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import StarIcon from "@mui/icons-material/Star";
import { categories } from "../../utils/constants";
import MetaData from "../Layouts/MetaData";
import { getRandomProducts } from "../../utils/functions";
import { useLocation } from "react-router-dom";

const Products = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();
    const location = useLocation();
    const [price, setPrice] = useState([0, 20000000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);

    // pagination
    const [currentPage, setCurrentPage] = useState(1);

    // filter toggles
    const [categoryToggle, setCategoryToggle] = useState(true);
    const [ratingsToggle, setRatingsToggle] = useState(true);

    const {
        products,
        loading,
        error,
        productsCount,
        resultPerPage,
        filteredProductsCount,
    } = useSelector((state) => state.products);
    const keyword = params.keyword;
    const [s1, s2] = location.search.split("=");
    const priceHandler = (e, newPrice) => {
        setPrice(newPrice);
        console.log(newPrice);
    };

    const clearFilters = () => {
        setPrice([0, 20000000]);
        setCategory("");
        setRatings(0);
    };

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        dispatch(
            getProducts(s1, s2, keyword, category, price, ratings, currentPage)
        );
    }, [
        dispatch,
        keyword,
        category,
        price,
        ratings,
        currentPage,
        error,
        enqueueSnackbar,
    ]);
    console.log(products);
    const priceList = [
        {
            label: "Dưới 1 triệu",
            price: [0, 1000000],
        },
        {
            label: "Từ 1 đến 3 triệu",
            price: [1000000, 3000000],
        },
        {
            label: "Từ 3 đến 5 triệu",
            price: [3000000, 5000000],
        },
        {
            label: "Từ 5 đến 8 triệu",
            price: [5000000, 8000000],
        },
        {
            label: "Trên 8 triệu",
            price: [8000000, 88000000],
        },
    ];
    return (
        <>
            <MinCategory />
            <main className="w-full mt-14 sm:mt-0">
                {/* <!-- row --> */}
                <div className="flex gap-3 mt-2 sm:mt-2 sm:mx-3 m-auto mb-7">
                    {/* <!-- sidebar column  --> */}
                    <div className="hidden sm:flex flex-col w-1/5 px-1">
                        {/* <!-- nav tiles --> */}
                        <div className="flex flex-col bg-white rounded-sm shadow">
                            {/* <!-- filters header --> */}
                            <div className="flex items-center justify-between gap-5 px-4 py-2 border-b">
                                <p className="text-lg font-medium">Bộ lọc</p>
                                <span
                                    className="uppercase text-primary-blue text-xs cursor-pointer font-medium"
                                    onClick={() => clearFilters()}
                                >
                                    xoá
                                </span>
                            </div>

                            <div className="flex flex-col gap-2 py-3 text-sm overflow-hidden">
                                {/* price slider filter */}
                                <div className="flex flex-col gap-2 border-b px-4">
                                    <span className="font-medium text-xs">
                                        Giá
                                    </span>
                                    {
                                        <div className="flex flex-col pb-1">
                                            <FormControl>
                                                <RadioGroup
                                                    aria-labelledby="price-radio-buttons-group"
                                                    onChange={(e, newPrice) => {
                                                        const price =
                                                            newPrice.split(",");
                                                        const price2 = [
                                                            +price[0],
                                                            +price[1],
                                                        ];
                                                        // console.log(price2);
                                                        setPrice(price2);
                                                    }}
                                                    name="price-radio-buttons"
                                                    value={price}
                                                >
                                                    {priceList.map((el, i) => (
                                                        <FormControlLabel
                                                            key={i}
                                                            value={el.price}
                                                            control={
                                                                <Radio size="small" />
                                                            }
                                                            label={
                                                                <span
                                                                    className="text-sm"
                                                                    key={i}
                                                                >
                                                                    {el.label}
                                                                </span>
                                                            }
                                                        />
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                    }
                                </div>
                                {/* price slider filter */}

                                {/* category filter */}
                                <div className="flex flex-col border-b px-4">
                                    <div
                                        className="flex justify-between cursor-pointer py-2 pb-4 items-center"
                                        onClick={() =>
                                            setCategoryToggle(!categoryToggle)
                                        }
                                    >
                                        <p className="font-medium text-xs uppercase">
                                            Danh mục
                                        </p>
                                        {categoryToggle ? (
                                            <ExpandLessIcon
                                                sx={{ fontSize: "20px" }}
                                            />
                                        ) : (
                                            <ExpandMoreIcon
                                                sx={{ fontSize: "20px" }}
                                            />
                                        )}
                                    </div>

                                    {categoryToggle && (
                                        <div className="flex flex-col pb-1">
                                            <FormControl>
                                                <RadioGroup
                                                    aria-labelledby="category-radio-buttons-group"
                                                    onChange={(e) =>
                                                        setCategory(
                                                            e.target.value
                                                        )
                                                    }
                                                    name="category-radio-buttons"
                                                    value={category}
                                                >
                                                    {categories.map((el, i) => (
                                                        <FormControlLabel
                                                            value={el}
                                                            control={
                                                                <Radio size="small" />
                                                            }
                                                            label={
                                                                <span
                                                                    className="text-sm"
                                                                    key={i}
                                                                >
                                                                    {el}
                                                                </span>
                                                            }
                                                        />
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                    )}
                                </div>
                                {/* category filter */}

                                {/* ratings filter */}
                                <div className="flex flex-col border-b px-4">
                                    <div
                                        className="flex justify-between cursor-pointer py-2 pb-4 items-center"
                                        onClick={() =>
                                            setRatingsToggle(!ratingsToggle)
                                        }
                                    >
                                        <p className="font-medium text-xs uppercase">
                                            Đánh giá
                                        </p>
                                        {ratingsToggle ? (
                                            <ExpandLessIcon
                                                sx={{ fontSize: "20px" }}
                                            />
                                        ) : (
                                            <ExpandMoreIcon
                                                sx={{ fontSize: "20px" }}
                                            />
                                        )}
                                    </div>

                                    {ratingsToggle && (
                                        <div className="flex flex-col pb-1">
                                            <FormControl>
                                                <RadioGroup
                                                    aria-labelledby="ratings-radio-buttons-group"
                                                    onChange={(e) =>
                                                        setRatings(
                                                            e.target.value
                                                        )
                                                    }
                                                    value={ratings}
                                                    name="ratings-radio-buttons"
                                                >
                                                    {[4, 3, 2, 1].map(
                                                        (el, i) => (
                                                            <FormControlLabel
                                                                value={el}
                                                                key={i}
                                                                control={
                                                                    <Radio size="small" />
                                                                }
                                                                label={
                                                                    <span className="flex items-center text-sm">
                                                                        {el}
                                                                        <StarIcon
                                                                            sx={{
                                                                                fontSize:
                                                                                    "12px",
                                                                                mr: 0.5,
                                                                            }}
                                                                        />{" "}
                                                                        trở lên
                                                                    </span>
                                                                }
                                                            />
                                                        )
                                                    )}
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                    )}
                                </div>
                                {/* ratings filter */}
                            </div>
                        </div>
                        {/* <!-- nav tiles --> */}
                    </div>
                    {/* <!-- sidebar column  --> */}

                    {/* <!-- search column --> */}
                    <div className="flex-1">
                        {!loading && products?.length === 0 && (
                            <div className="flex flex-col items-center justify-center gap-3 bg-white shadow-sm rounded-sm p-6 sm:p-16">
                                <img
                                    draggable="false"
                                    className="w-1/2 h-44 object-contain"
                                    src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg//assets/a60759ad1dabe909c46a817ecbf71878.png"
                                    alt="Search Not Found"
                                />
                                <h1 className="text-2xl font-medium text-gray-900">
                                    Không tìm thấy sản phẩm nào !!!
                                </h1>
                                <p className="text-xl text-center text-primary-grey">
                                    Vui lòng kiểm tra lại.
                                </p>
                            </div>
                        )}

                        {loading ? (
                            <Loader />
                        ) : (
                            <div className="flex flex-col gap-2 pb-4 justify-center items-center w-full overflow-hidden bg-white">
                                <div className="grid grid-cols-1 sm:grid-cols-4 w-full place-content-start overflow-hidden pb-4 border-b">
                                    {products?.map((product) => (
                                        <Product
                                            {...product}
                                            key={product._id}
                                        />
                                    ))}
                                </div>
                                {filteredProductsCount > resultPerPage && (
                                    <Pagination
                                        count={Number(
                                            (
                                                (filteredProductsCount + 6) /
                                                resultPerPage
                                            ).toFixed()
                                        )}
                                        page={currentPage}
                                        onChange={(e, val) =>
                                            setCurrentPage(val)
                                        }
                                        color="primary"
                                    />
                                )}
                            </div>
                        )}
                    </div>
                    {/* <!-- search column --> */}
                </div>
                {/* <!-- row --> */}
            </main>
        </>
    );
};

export default Products;
