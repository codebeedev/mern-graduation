import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import { Dropdown, Menu, Space } from "antd";
// import "./styles.scss";
import NavbarDropdown from "react-navbar-dropdown";
const categories = [
    "Thương hiệu",
    "Đồng hồ nam",
    "Đồng hồ nữ",
    "Loại máy",
    "Chất liệu",
    "Phụ kiện",
    "Tin tức",
    "Liên hệ",
    "Về chúng tôi",
];

const MinCategory = (props) => {
    return (
        <section
            className={`z-[1000] hidden sm:block bg-white w-full px-2 sm:px-12 overflow-visible border-b mt-14 ${
                props.fixed ? "fixed z-10 mt-4" : ""
            }`}
        >
            <div className="flex items-center justify-between p-0.5 cursor-pointer">
                {/* <ul className="flex">
                    <li>
                        <a href="" className="menu-item">
                            HOME
                        </a>
                    </li>
                    <li className="group">
                        <a href="" className="menu-item group-hover:border-white">
                            MEGA
                        </a>
                        <div className="grid grid-cols-4 w-full p-5 absolute top-full left-0 bg-black mt-14 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:mt-0 transition-all duration-500">
                            <ul className="p-2">
                                <li>
                                    <a href="" className="mega-sub-item-title">
                                        Product category
                                    </a>
                                </li>
                                <li>
                                    <a href="" className="mega-sub-item">
                                        Sub category
                                    </a>
                                </li>
                                <li>
                                    <a href="" className="mega-sub-item">
                                        Sub category
                                    </a>
                                </li>
                                <li>
                                    <a href="" className="mega-sub-item">
                                        Sub category
                                    </a>
                                </li>
                                <li>
                                    <a href="" className="mega-sub-item">
                                        Sub category
                                    </a>
                                </li>
                            </ul>
                            <ul className="p-2">
                                <li>
                                    <a href="" className="mega-sub-item-title">
                                        Product category
                                    </a>
                                </li>
                                <li>
                                    <a href="" className="mega-sub-item">
                                        Sub category
                                    </a>
                                </li>
                                <li>
                                    <a href="" className="mega-sub-item">
                                        Sub category
                                    </a>
                                </li>
                                <li>
                                    <a href="" className="mega-sub-item">
                                        Sub category
                                    </a>
                                </li>
                                <li>
                                    <a href="" className="mega-sub-item">
                                        Sub category
                                    </a>
                                </li>
                            </ul>
                            <ul className="p-2">
                                <li>
                                    <a href="" className="mega-sub-item-title">
                                        Product category
                                    </a>
                                </li>
                                <li>
                                    <a href="" className="mega-sub-item">
                                        Sub category
                                    </a>
                                </li>
                                <li>
                                    <a href="" className="mega-sub-item">
                                        Sub category
                                    </a>
                                </li>
                                <li>
                                    <a href="" className="mega-sub-item">
                                        Sub category
                                    </a>
                                </li>
                                <li>
                                    <a href="" className="mega-sub-item">
                                        Sub category
                                    </a>
                                </li>
                            </ul>
                            <ul className="p-2">
                                <li>
                                    <a href="" className="mega-sub-item-title">
                                        Product category
                                    </a>
                                </li>
                                <li>
                                    <a href="" className="mega-sub-item">
                                        Sub category
                                    </a>
                                </li>
                                <li>
                                    <a href="" className="mega-sub-item">
                                        Sub category
                                    </a>
                                </li>
                                <li>
                                    <a href="" className="mega-sub-item">
                                        Sub category
                                    </a>
                                </li>
                                <li>
                                    <a href="" className="mega-sub-item">
                                        Sub category
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className="group relative">
                        <a href="" className="menu-item group-hover:border-white">
                            DROPDOWN
                        </a>
                        <ul className="absolute left-0 bg-black w-max mt-14 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:mt-0 transition-all duration-500">
                            <li>
                                <a href="" className="menu-sub-item">
                                    Dropdown menu
                                </a>
                            </li>
                            <li>
                                <a href="" className="menu-sub-item">
                                    Dropdown menu
                                </a>
                            </li>
                            <li className="sub-dropdown relative">
                                <a href="" className="menu-sub-item">
                                    Dropdown menu
                                </a>
                                <ul className="sub-dropdown-content absolute left-full top-full bg-black w-max opacity-0 invisible transition-all duration-500">
                                    <li>
                                        <a href="" className="menu-sub-item">
                                            Sub dropdown menu
                                        </a>
                                    </li>
                                    <li>
                                        <a href="" className="menu-sub-item">
                                            Sub dropdown menu
                                        </a>
                                    </li>
                                    <li className="sub-dropdown relative">
                                        <a href="" className="menu-sub-item">
                                            Dropdown menu
                                        </a>
                                        <ul className="sub-dropdown-content absolute left-full top-full bg-black w-max opacity-0 invisible transition-all duration-500">
                                            <li>
                                                <a
                                                    href=""
                                                    className="menu-sub-item"
                                                >
                                                    Sub dropdown menu
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href=""
                                                    className="menu-sub-item"
                                                >
                                                    Sub dropdown menu
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href=""
                                                    className="menu-sub-item"
                                                >
                                                    Sub dropdown menu
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href=""
                                                    className="menu-sub-item"
                                                >
                                                    Sub dropdown menu
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="" className="menu-sub-item">
                                            Sub dropdown menu
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="sub-dropdown relative">
                                <a href="" className="menu-sub-item">
                                    Dropdown menu
                                </a>
                                <ul className="sub-dropdown-content absolute left-full top-full bg-black w-max opacity-0 invisible transition-all duration-500">
                                    <li>
                                        <a href="" className="menu-sub-item">
                                            Sub dropdown menu
                                        </a>
                                    </li>
                                    <li>
                                        <a href="" className="menu-sub-item">
                                            Sub dropdown menu
                                        </a>
                                    </li>
                                    <li>
                                        <a href="" className="menu-sub-item">
                                            Sub dropdown menu
                                        </a>
                                    </li>
                                    <li>
                                        <a href="" className="menu-sub-item">
                                            Sub dropdown menu
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="" className="menu-sub-item">
                                    Dropdown menu
                                </a>
                            </li>
                            <li>
                                <a href="" className="menu-sub-item">
                                    Dropdown menu
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="" className="menu-item">
                            BLOG
                        </a>
                    </li>
                    <li>
                        <a href="" className="menu-item">
                            ABOUT
                        </a>
                    </li>
                    <li>
                        <a href="" className="menu-item">
                            ACCOUNT
                        </a>
                    </li>
                    <li>
                        <a href="" className="menu-item">
                            CART
                        </a>
                    </li>
                </ul> */}
                {/* {categories.map((el, i) => (
                    <Link
                        to="/products"
                        key={i}
                        className="text-sm p-2 text-gray-800 font-medium hover:text-primary-blue flex items-center gap-0.5 group"
                    >
                        {el}{" "}
                        <span className="text-gray-400 group-hover:text-primary-blue">
                            <ExpandMoreIcon sx={{ fontSize: "16px" }} />
                        </span>
                    </Link>
                ))} */}
                <div className="text-sm z-[1000] p-2 text-gray-800 font-medium hover:text-black flex items-center gap-0.5 group">
                    Thương hiệu
                    <span className="text-gray-400 group-hover:text-primary-blue">
                        <ExpandMoreIcon sx={{ fontSize: "16px" }} />
                    </span>
                    <div className=" z-[1000] grid grid-cols-4 w-full p-5 absolute top-full left-0 bg-white mt-14 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:mt-0 transition-all duration-500">
                        <ul className="p-2 z-[1000]">
                            <li>
                                <a href="#" className="mega-sub-item-title">
                                    Thương hiệu bán chạy
                                </a>
                            </li>
                            <li>
                                <Link
                                    to="/products?brand.name=Casio"
                                    className="mega-sub-item"
                                >
                                    Đồng hồ Casio
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/products?brand.name=GSock"
                                    className="mega-sub-item"
                                >
                                    Đồng hồ G-Sock
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/products?brand.name=BabyG"
                                    className="mega-sub-item"
                                >
                                    Đồng hồ BabyG
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/products?brand.name=Ediffice"
                                    className="mega-sub-item"
                                >
                                    Đồng hồ Ediffice
                                </Link>
                            </li>
                        </ul>
                        <ul className="p-2">
                            <li>
                                <li>
                                    <a href="#" className="mega-sub-item-title">
                                        Thương hiệu phổ biến
                                    </a>
                                </li>
                            </li>
                            <li>
                                <Link
                                    to="/products?brand.name=Cole"
                                    className="mega-sub-item"
                                >
                                    Đồng hồ Cole
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/products?brand.name=Citizen"
                                    className="mega-sub-item"
                                >
                                    Đồng hồ Citizen
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/products?brand.name=DW"
                                    className="mega-sub-item"
                                >
                                    Đồng hồ Daniel Wellington
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/products?brand.name=Fossil"
                                    className="mega-sub-item"
                                >
                                    Đồng hồ Fossil
                                </Link>
                            </li>
                        </ul>
                        <ul className="p-2">
                            <li>
                                <li>
                                    <a href="#" className="mega-sub-item-title">
                                        Thương hiệu khuyến mãi
                                    </a>
                                </li>
                            </li>
                            <li>
                                <Link
                                    to="/products?brand.name=Julius"
                                    className="mega-sub-item"
                                >
                                    Đồng hồ Julius
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/products?brand.name=MVMT"
                                    className="mega-sub-item"
                                >
                                    Đồng hồ MVMT
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/products?brand.name=Ogibal"
                                    className="mega-sub-item"
                                >
                                    Đồng hồ Ogibal
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/products?brand.name=Seiko"
                                    className="mega-sub-item"
                                >
                                    Đồng hồ Seiko
                                </Link>
                            </li>
                        </ul>
                        <ul className="p-2">
                            <li>
                                <li>
                                    <a href="#" className="mega-sub-item-title">
                                        Thương hiệu hot
                                    </a>
                                </li>
                            </li>
                            <li>
                                <Link
                                    to="/products?brand.name=Casio"
                                    className="mega-sub-item"
                                >
                                    Đồng hồ Orient
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/products?brand.name=Olym Pianus"
                                    className="mega-sub-item"
                                >
                                    Đồng hồ Olym Pianus
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/products?brand.name=Skagen"
                                    className="mega-sub-item"
                                >
                                    Đồng hồ Skagen
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/products?brand.name=Tisot"
                                    className="mega-sub-item"
                                >
                                    Đồng hồ Tisot
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>{" "}
                <Link
                    to="/products?gender=Male"
                    className="relative text-sm p-2 text-gray-800 font-medium hover:text-primary-blue flex items-center gap-0.5 group"
                >
                    Đồng Hồ Nam
                </Link>{" "}
                <Link
                    to="/products?gender=Female"
                    className="text-sm p-2 text-gray-800 font-medium hover:text-primary-blue flex items-center gap-0.5 group"
                >
                    Đồng Hồ Nữ
                </Link>{" "}
                <div className="relative text-sm p-2 text-gray-800 font-medium hover:text-black flex items-center gap-0.5 group">
                    Loại máy
                    <span className="text-gray-400 group-hover:text-primary-blue">
                        <ExpandMoreIcon sx={{ fontSize: "16px" }} />
                    </span>
                    <ul className="absolute  z-[1000] top-10 left-0 bg-white w-max mt-14 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:mt-0 transition-all duration-500">
                        <li>
                            <Link
                                to="/products?category=Pin"
                                className="menu-sub-item"
                            >
                                Pin (Quartz)
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/products?category=Cơ tự động"
                                className="menu-sub-item"
                            >
                                Cơ tự động
                            </Link>
                        </li>
                        <li className="sub-dropdown relative">
                            <Link
                                to="/products?category=Eco Drive"
                                className="menu-sub-item"
                            >
                                Eco Drive
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/products?category=Điện tử"
                                className="menu-sub-item"
                            >
                                Điện tử
                            </Link>
                        </li>
                    </ul>
                </div>{" "}
                <Link
                    to="/products"
                    className="relative text-sm p-2 text-gray-800 font-medium hover:text-primary-blue flex items-center gap-0.5 group"
                >
                    Chất liệu dây
                    <span className="text-gray-400 group-hover:text-primary-blue">
                        <ExpandMoreIcon sx={{ fontSize: "16px" }} />
                    </span>
                    <ul className="absolute top-10 left-0 bg-black w-max mt-14 opacity-0 invisible z-[1000] group-hover:opacity-100 group-hover:visible group-hover:mt-0 transition-all duration-500">
                        <li>
                            <a href="" className="menu-sub-item">
                                Dropdown menu
                            </a>
                        </li>
                        <li>
                            <a href="" className="menu-sub-item">
                                Dropdown menu
                            </a>
                        </li>
                        <li className="sub-dropdown relative">
                            <a href="" className="menu-sub-item">
                                Dropdown menu
                            </a>
                        </li>
                        <li>
                            <a href="" className="menu-sub-item">
                                Dropdown menu
                            </a>
                        </li>
                        <li>
                            <a href="" className="menu-sub-item">
                                Dropdown menu
                            </a>
                        </li>
                    </ul>
                </Link>{" "}
                <Link
                    to="/products"
                    className="text-sm p-2 text-gray-800 font-medium hover:text-primary-blue flex items-center gap-0.5 group"
                >
                    Tin tức
                    <span className="text-gray-400 group-hover:text-primary-blue">
                        <ExpandMoreIcon sx={{ fontSize: "16px" }} />
                    </span>
                </Link>{" "}
                <Link
                    to="/products"
                    className="text-sm p-2 text-gray-800 font-medium hover:text-primary-blue flex items-center gap-0.5 group"
                >
                    Về chúng tôi
                    <span className="text-gray-400 group-hover:text-primary-blue">
                        <ExpandMoreIcon sx={{ fontSize: "16px" }} />
                    </span>
                </Link>
            </div>
        </section>
    );
};

export default MinCategory;
