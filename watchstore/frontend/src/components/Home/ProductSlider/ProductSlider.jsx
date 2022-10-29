import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { getRandomProducts } from "../../../utils/functions";
import { settings } from "../DealSlider/DealSlider";
import Product from "./Product";

const ProductSlider = ({
    title,
    tagline,
    filterKey = "",
    valueFilter = "",
}) => {
    const { loading, products } = useSelector((state) => state.products);
    // console.log(products.filter((product) => product.gender === "Female"));
    console.log(filterKey, valueFilter);
    let newProducts;
    if (filterKey === "gender") {
        newProducts = products.filter(
            (product) => product.gender === valueFilter
        );
    }
    if (filterKey === "category") {
        newProducts = products.filter(
            (product) => product.category === valueFilter
        );
    }
    if (filterKey === "brand") {
        newProducts = products.filter(
            (product) => product.brand.name === valueFilter
        );
    }
    if (filterKey === "") {
        newProducts = products;
    }

    console.log(newProducts);
    return (
        <section className="bg-white w-full shadow overflow-hidden">
            {/* <!-- header --> */}
            <div className="flex px-6 py-4 justify-between items-center">
                <div className="title flex flex-col gap-0.5">
                    <h1 className="text-xl font-medium">{title}</h1>
                    <p className="text-sm text-gray-400">{tagline}</p>
                </div>
                <Link
                    to={`/products?${filterKey}=${valueFilter}`}
                    className="bg-primary-blue text-xs font-medium text-white px-5 py-2.5 rounded-sm shadow-lg uppercase"
                >
                    Xem tất cả
                </Link>
            </div>
            <hr />
            {loading ? null : (
                <Slider
                    {...settings}
                    className="flex items-center justify-between p-1"
                >
                    {newProducts &&
                        newProducts.map((product) => (
                            <Product {...product} key={product._id} />
                        ))}
                </Slider>
            )}
        </section>
    );
};

export default ProductSlider;
