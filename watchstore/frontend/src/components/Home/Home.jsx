import { useEffect } from "react";
import Categories from "../Layouts/Categories";
import MinCategory from "../Layouts/MinCategory";
import Banner from "./Banner/Banner";
import DealSlider from "./DealSlider/DealSlider";
import ProductSlider from "./ProductSlider/ProductSlider";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getSliderProducts } from "../../actions/productAction";
import { useSnackbar } from "notistack";
import MetaData from "../Layouts/MetaData";

const Home = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { error, loading } = useSelector((state) => state.products);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        dispatch(getSliderProducts());
    }, [dispatch, error, enqueueSnackbar]);

    return (
        <>
            <MinCategory fixed></MinCategory>
            <Banner />
            <Categories />
            <main className="flex flex-col gap-3 px-2 mt-16 sm:mt-2">
                {!loading && (
                    <ProductSlider
                        title={"Đồng hồ nữ"}
                        tagline={""}
                        filterKey="gender"
                        valueFilter="Female"
                    />
                )}

                {!loading && (
                    <ProductSlider
                        title={"Đồng hồ nam"}
                        tagline={""}
                        filterKey="gender"
                        valueFilter="Male"
                    />
                )}
                {!loading && (
                    <ProductSlider
                        title={"Sản phẩm mới nhất"}
                        tagline={""}
                        // filterKey="gender"
                        // valueFilter="Male"
                    />
                )}
            </main>
        </>
    );
};

export default Home;
