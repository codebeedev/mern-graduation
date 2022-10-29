import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PriceSidebar from "./PriceSidebar";
import Stepper from "./Stepper";
import { PayPalButton } from "react-paypal-button-v2";
// import {
//     CardNumberElement,
//     CardCvcElement,
//     CardExpiryElement,
//     useStripe,
//     useElements,
// } from '@stripe/react-stripe-js';
import { clearErrors, newOrder } from "../../actions/orderAction";
import { emptyCart } from "../../actions/cartAction";
import { useSnackbar } from "notistack";
import { post } from "../../utils/paytmForm";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import MetaData from "../Layouts/MetaData";
import { useNavigate } from "react-router-dom";

const Payment = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    // const stripe = useStripe();
    // const elements = useElements();
    // const paymentBtn = useRef(null);

    const [payDisable, setPayDisable] = useState(false);
    const [payMode, setPayMode] = useState("cod");
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { error } = useSelector((state) => state.newOrder);

    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const totalPriceUsd = +(totalPrice / 23320).toFixed(2);
    console.log(totalPriceUsd);

    const submitHandler = async (e) => {
        e.preventDefault();
        setPayDisable(true);

        try {
            if (payMode === "cod") {
                const data = {
                    shippingInfo,

                    orderItems: cartItems,
                    user,
                    paymentInfo: {
                        id: 1,
                        status: "COD",
                    },
                    totalPrice,
                };
                console.log(data);
                dispatch(newOrder(data));

                dispatch(emptyCart());
                // cartItems = [];
                enqueueSnackbar("Success", { variant: "success" });
                // navigate("/cart");
                navigate("/orders");
            } else {
                const data = {
                    shippingInfo,

                    orderItems: cartItems,
                    user,
                    paymentInfo: {
                        id: 1,
                        status: "COD",
                    },
                    isPaid: false,
                    totalPrice,
                };
                console.log(data);
            }
        } catch (error) {
            setPayDisable(false);
            enqueueSnackbar(error, { variant: "error" });
        }
    };
    const handlePaymentMode = (e) => {
        console.log(e.target.value);
        setPayMode(e.target.value);
    };
    useEffect(() => {
        if (error) {
            dispatch(clearErrors());
            enqueueSnackbar(error, { variant: "error" });
        }
    }, [dispatch, error, enqueueSnackbar]);
    const [SDKReady, setSDKReady] = useState(false);

    useEffect(() => {
        const addScript = async () => {
            // add the script
            const script = document.createElement("script");
            script.async = true;
            script.type = "text/javascript";
            script.src = `https://www.paypal.com/sdk/js?client-id=AQ_zQkyW6RE154a6IHaXRKUo_9OqvigHNZSckb9PHSZlJBBkXYZsFpxMCLZojsxK7Zq1sgGdy0cx_-zf&currency=USD&disable-funding=credit,card`;
            script.onload = () => setSDKReady(true);
            document.body.appendChild(script);
        };
        // if (!userInfo) history.push('/login'); // if not loggein in
        if (!SDKReady) addScript();
    }, [SDKReady]);
    const successPaymentHandler = () => {
        const data = {
            shippingInfo,
            orderItems: cartItems,
            user,
            paymentInfo: {
                id: 2,
                status: "Paypal",
            },
            isPaid: true,
            totalPrice,
        };
        console.log(data);
        dispatch(newOrder(data));

        dispatch(emptyCart());
        // cartItems = [];
        enqueueSnackbar("Success", { variant: "success" });
        // navigate("/cart");
        navigate("/order/success");
    };
    return (
        <>
            <main className="w-full mt-20">
                {/* <!-- row --> */}
                <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-11/12 mt-0 sm:mt-4 m-auto sm:mb-7">
                    {/* <!-- cart column --> */}
                    <div className="flex-1">
                        <Stepper activeStep={3}>
                            <div className="w-full bg-white">
                                <form
                                    onSubmit={(e) => submitHandler(e)}
                                    autoComplete="off"
                                    className="flex flex-col justify-start gap-2 w-full mx-8 my-4 overflow-hidden"
                                >
                                    <FormControl>
                                        <RadioGroup
                                            aria-labelledby="payment-radio-group"
                                            defaultValue="cod"
                                            name="payment-radio-button"
                                            style={{ display: "flex" }}
                                        >
                                            <FormControlLabel
                                                value="cod"
                                                control={<Radio />}
                                                label={
                                                    <div className="flex items-center gap-4">
                                                        <span>
                                                            Thanh toán khi nhận
                                                            hàng
                                                        </span>
                                                    </div>
                                                }
                                                onChange={handlePaymentMode}
                                            />
                                            <FormControlLabel
                                                value="paypal"
                                                control={<Radio />}
                                                label={
                                                    <div className="flex items-center gap-4">
                                                        <span>Paypal</span>
                                                    </div>
                                                }
                                                onChange={handlePaymentMode}
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                    {payMode === "cod" && (
                                        <input
                                            type="submit"
                                            value={`Đặt hàng `}
                                            disabled={payDisable ? true : false}
                                            className={`${
                                                payDisable
                                                    ? "bg-primary-grey cursor-not-allowed"
                                                    : "bg-primary-blue cursor-pointer"
                                            } mx-auto  w-1/2 sm:w-1/4 my-2 py-3 font-medium text-white shadow hover:shadow-lg rounded-sm uppercase outline-none`}
                                        />
                                    )}
                                    {payMode === "paypal" && (
                                        <div className="w-1/2 mx-auto">
                                            <PayPalButton
                                                style={{
                                                    layout: "vertical",
                                                    color: "blue",
                                                    shape: "rect",
                                                    label: "paypal",
                                                }}
                                                currency="USD"
                                                amount={totalPriceUsd}
                                                // converting INR to USD, as paypal cannot support INR
                                                // amount={Number(
                                                // 	order.totalPrice /
                                                // 		72
                                                // ).toFixed(2)}
                                                onSuccess={
                                                    successPaymentHandler
                                                }
                                                options={{
                                                    clientId:
                                                        "AQ_zQkyW6RE154a6IHaXRKUo_9OqvigHNZSckb9PHSZlJBBkXYZsFpxMCLZojsxK7Zq1sgGdy0cx_-zf",
                                                }}
                                            />
                                        </div>
                                    )}
                                </form>
                            </div>
                        </Stepper>
                    </div>

                    <PriceSidebar cartItems={cartItems} />
                </div>
            </main>
        </>
    );
};

export default Payment;
