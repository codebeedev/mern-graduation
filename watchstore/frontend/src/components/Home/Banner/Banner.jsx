import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Banner.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import banner1 from "../../../assets/images/Banners/banner1.jpg";
import banner2 from "../../../assets/images/Banners/banner2.jpg";
import banner3 from "../../../assets/images/Banners/banner3.jpg";
import banner4 from "../../../assets/images/Banners/banner4.jpg";
import banner5 from "../../../assets/images/Banners/banner5.jpg";

export const PreviousBtn = ({ className, onClick }) => {
    return (
        <div className={className} onClick={onClick}>
            <ArrowBackIosIcon />
        </div>
    );
};

export const NextBtn = ({ className, onClick }) => {
    return (
        <div className={className} onClick={onClick}>
            <ArrowForwardIosIcon />
        </div>
    );
};

const Banner = () => {
    const settings = {
        autoplay: true,
        autoplaySpeed: 2000,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <PreviousBtn />,
        nextArrow: <NextBtn />,
    };

    const banners = [banner1, banner2, banner4, banner5];

    return (
        <>
            <section className="h-44 sm:h-[400px] w-full rounded-sm shadow relative overflow-hidden mt-10">
                <Slider {...settings}>
                    {banners.map((el, i) => (
                        <img
                            draggable="false"
                            className="h-full w-full object-cover"
                            src={el}
                            alt="banner"
                            key={i}
                        />
                    ))}
                </Slider>
            </section>
        </>
    );
};

export default Banner;
