import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loginUser } from "../../actions/userAction";
import { useSnackbar } from "notistack";
import BackdropLoader from "../Layouts/BackdropLoader";
import MetaData from "../Layouts/MetaData";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import GoogleLogin from "react-google-login";
const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const location = useLocation();

    const { loading, isAuthenticated, error, user } = useSelector(
        (state) => state.user
    );

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginUser(email, password));
    };

    const redirect = location.search ? location.search.split("=")[1] : "";

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            if (user?.role === "admin") navigate(`/admin/dashboard`);
            else navigate(`/${redirect}`);
        }
    }, [dispatch, error, isAuthenticated, redirect, navigate, enqueueSnackbar]);

    const handleSuccessLogin = (response) => {
        console.log(response);
    };
    const handleFailureLogin = (response) => {
        console.log(response);
    };
    return (
        <>
            {loading && <BackdropLoader />}
            <main className="w-3/4 mx-auto mt-12 sm:pt-20 sm:mt-0">
                {/* <!-- row --> */}
                <div className="flex sm:w-4/6 sm:mt-4 m-auto mb-7 bg-white shadow-lg">
                    {/* <!-- sidebar column  --> */}

                    {/* <!-- sidebar column  --> */}

                    {/* <!-- login column --> */}
                    <div className="flex-1 overflow-hidden">
                        {/* <!-- edit info container --> */}
                        <div className="text-center py-10 px-4 sm:px-14">
                            {/* <!-- input container --> */}
                            <form onSubmit={handleLogin}>
                                <div className="flex flex-col w-full gap-4">
                                    <TextField
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        required
                                    />
                                    <TextField
                                        fullWidth
                                        id="password"
                                        label="Mật khẩu"
                                        type="password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        required
                                    />
                                    {/* <span className="text-xxs text-red-500 font-medium text-left mt-0.5">Please enter valid Email ID/Mobile number</span> */}

                                    {/* <!-- button container --> */}
                                    <div className="flex flex-col gap-2.5 mt-2 mb-12">
                                        <div className="flex justify-between">
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
                                                    Chính sách bảo mật
                                                </a>
                                            </p>
                                            <p className="text-xs text-primary-grey text-left">
                                                <Link to="/password/forgot">
                                                    Quên mật khẩu ?
                                                </Link>
                                            </p>
                                        </div>

                                        <button
                                            type="submit"
                                            className="text-white py-3 w-[20%] bg-primary-blue shadow hover:shadow-lg rounded-sm font-medium ml-auto"
                                        >
                                            Đăng nhập
                                        </button>

                                        <p className="underline mt-10">HOẶC</p>
                                        <div className="mt-2 flex gap-5 justify-center">
                                            {/* <div className="flex px-8  py-2 border border-1 cursor-pointer rounded-sm hover:bg-primary-blue hover:text-white ">
                                                <AppleIcon></AppleIcon>
                                                <p>Apple</p>
                                            </div>
                                            <div className="flex px-8  py-2 border border-1 cursor-pointer rounded-sm hover:bg-primary-blue hover:text-white ">
                                                <FacebookIcon></FacebookIcon>
                                                <p>Facebook</p>
                                            </div>
                                            <div className="flex px-8  py-2 border border-1 cursor-pointer rounded-sm hover:bg-primary-blue hover:text-white ">
                                                <GoogleIcon></GoogleIcon>
                                                <p>Apple</p>
                                            </div> */}
                                            <div className="flex px-8  py-2 border border-1 cursor-pointer rounded-sm hover:bg-primary-blue hover:text-white ">
                                                <GoogleLogin
                                                    clientId="1034839797593-3bn21l32fkaca9atc2lcaq7d5l751neb.apps.googleusercontent.com"
                                                    buttonText="Đăng nhập với Google"
                                                    onSuccess={
                                                        handleSuccessLogin
                                                    }
                                                    onFailure={
                                                        handleFailureLogin
                                                    }
                                                    cookiePolicy={
                                                        "single_host_origin"
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div></div>
                                    </div>
                                    {/* <!-- button container --> */}
                                </div>
                            </form>
                            {/* <!-- input container --> */}

                            <Link
                                to="/register"
                                className="font-medium text-sm text-primary-blue"
                            >
                                Chưa có tài khoản? Tạo tài khoản mới
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

export default Login;
