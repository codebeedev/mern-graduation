import babyg from "../../assets/images/Brands/babyg.png";
import casio from "../../assets/images/Brands/casio.png";
import citizen from "../../assets/images/Brands/citizen.png";
import cole from "../../assets/images/Brands/cole.png";
import dw from "../../assets/images/Brands/dw.png";
import ediffice from "../../assets/images/Brands/ediffice.png";
import fossil from "../../assets/images/Brands/fossil.png";
import gsock from "../../assets/images/Brands/gsock.png";
import julius from "../../assets/images/Brands/julius.png";
import mvmt from "../../assets/images/Brands/mvmt.png";
import ogibal from "../../assets/images/Brands/ogibal.png";
import orient from "../../assets/images/Brands/orient.png";
import pianus from "../../assets/images/Brands/pianus.png";
import seiko from "../../assets/images/Brands/seiko.png";
import sheen from "../../assets/images/Brands/sheen.png";
import skagen from "../../assets/images/Brands/skagen.png";
import tisot from "../../assets/images/Brands/tisot.png";
import zrc from "../../assets/images/Brands/zrc.png";
import { Link } from "react-router-dom";

const catNav = [
    {
        name: "BabyG",
        icon: babyg,
    },
    {
        name: "Cole",
        icon: cole,
    },
    {
        name: "Casio",
        icon: casio,
    },
    {
        name: "Citizen",
        icon: citizen,
    },
    {
        name: "DW",
        icon: dw,
    },
    {
        name: "Ediffice",
        icon: ediffice,
    },
    {
        name: "Fossil",
        icon: fossil,
    },
    {
        name: "GSock",
        icon: gsock,
    },
    {
        name: "Julius",
        icon: julius,
    },
    {
        name: "MVMT",
        icon: mvmt,
    },
    {
        name: "Ogibal",
        icon: ogibal,
    },
    {
        name: "Orient",
        icon: orient,
    },
    {
        name: "Olym Pianus",
        icon: pianus,
    },
    {
        name: "Seiko",
        icon: seiko,
    },
    {
        name: "Skagen",
        icon: skagen,
    },
    {
        name: "Tisot",
        icon: tisot,
    },
];

const Categories = () => {
    return (
        <section className="hidden sm:block bg-white mt-4 mb-4 min-w-full px-12 py-1 shadow overflow-hidden">
            <div className="flex items-center justify-between mt-4 flex-wrap">
                {catNav.map((item, i) => (
                    <Link
                        to={`/products?brand.name=${item.name}`}
                        className="flex flex-col gap-1 items-center p-2 group"
                        key={i}
                    >
                        <div className="h-32 w-32">
                            <img
                                draggable="false"
                                className="h-full w-full object-contain brightness-0"
                                src={item.icon}
                                alt={item.name}
                            />
                        </div>
                        <span className="text-sm text-gray-800 font-medium group-hover:text-primary-blue">
                            {item.name}
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default Categories;
