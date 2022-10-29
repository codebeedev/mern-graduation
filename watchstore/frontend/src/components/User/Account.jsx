import { useEffect } from "react";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Layouts/Loader";
import MinCategory from "../Layouts/MinCategory";
import MetaData from "../Layouts/MetaData";

const Account = () => {
    const navigate = useNavigate();

    const { user, loading, isAuthenticated } = useSelector(
        (state) => state.user
    );

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);

    const getLastName = () => {
        const nameArray = user.name.split(" ");
        return nameArray[nameArray.length - 1];
    };

    return (
        <>
            <MetaData title="My Profile" />

            {loading ? (
                <Loader />
            ) : (
                <>
                    <MinCategory />
                    <main className="w-full mt-12 sm:mt-0">
                        {/* <!-- row --> */}
                        <div className="flex gap-3.5 sm:w-11/12 sm:mt-4 m-auto mb-7">
                            <Sidebar activeTab={"profile"} />
                        </div>
                        {/* <!-- details column --> */}
                    </main>
                </>
            )}
        </>
    );
};

export default Account;
