import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../actions/userAction";
import { useSnackbar } from "notistack";
import BackdropLoader from "../Layouts/BackdropLoader";
import MetaData from "../Layouts/MetaData";
import FormSidebar from "./FormSidebar";

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { error, message, loading } = useSelector(
        (state) => state.forgotPassword
    );

    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set("email", email);
        dispatch(forgotPassword(formData));
        setEmail("");
    };

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (message) {
            enqueueSnackbar(message, { variant: "success" });
        }
    }, [dispatch, error, message, enqueueSnackbar]);

    return (
        <>
            {loading && <BackdropLoader />}
            <main className="w-2/4 mt-12 sm:pt-20 sm:mt-0 mx-auto">
                {/* <!-- row --> */}
                <div className="flex sm:w-4/6 sm:mt-4 m-auto mb-7 bg-white shadow-lg">
                    {/* <!-- login column --> */}
                    <div className="flex-1 overflow-hidden">
                        <h2 className="text-center text-2xl font-medium mt-6 text-gray-800">
                            Quên mật khẩu
                        </h2>

                        {/* <!-- edit info container --> */}
                        <div className="text-center py-10 px-4 sm:px-14">
                            {/* <!-- input container --> */}
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col w-full gap-4">
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        required
                                    />

                                    {/* <!-- button container --> */}
                                    <div className="flex flex-col gap-2.5 mt-2 mb-32">
                                        <p className="text-xs text-primary-grey text-left">
                                            Đồng ý với{" "}
                                            <a
                                                href=""
                                                className="text-primary-blue"
                                            >
                                                {" "}
                                                Điều khoản sử dụng
                                            </a>{" "}
                                            và{" "}
                                            <a
                                                href=""
                                                className="text-primary-blue"
                                            >
                                                {" "}
                                                Chính sách bảo mật.
                                            </a>
                                        </p>
                                        <button
                                            type="submit"
                                            className="text-white mt-4 mx-auto py-3 w-2/4 bg-primary-blue shadow rounded-sm font-medium"
                                        >
                                            Gửi
                                        </button>
                                    </div>
                                    {/* <!-- button container --> */}
                                </div>
                            </form>
                            {/* <!-- input container --> */}

                            <Link
                                to="/register"
                                className="font-medium text-sm text-primary-blue"
                            >
                                Tạo tài khoản mới
                            </Link>
                        </div>
                        {/* <!-- edit info container --> */}
                    </div>
                    {/* <!-- login column --> */}
                </div>
                {/* <!-- row --> */}
            </main>
        </>
    );
};

export default ForgotPassword;
