const asyncErrorHandler = require("../middlewares/asyncErrorHandler");
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const paytm = require("paytmchecksum");
const https = require("https");
const Payment = require("../models/paymentModel");
const ErrorHandler = require("../utils/errorHandler");
const { v4: uuidv4 } = require("uuid");
const querystring = require("qs");
const crypto = require("crypto");
const { VNPay } = require("vn-payments");
const sha256 = require("sha256");

const TEST_CONFIG = VNPay.TEST_CONFIG;
const vnpay = new VNPay({
    paymentGateway: TEST_CONFIG.paymentGateway,
    merchant: TEST_CONFIG.merchant,
    secureSecret: TEST_CONFIG.secureSecret,
});
function sortObject(o) {
    var sorted = {},
        key,
        a = [];

    for (key in o) {
        if (o.hasOwnProperty(key)) {
            a.push(key);
        }
    }

    a.sort();

    for (key = 0; key < a.length; key++) {
        sorted[a[key]] = o[a[key]];
    }
    return sorted;
}

// VNPAY
exports.getPaymentURL = asyncErrorHandler(async (req, res, next) => {
    const payment = await Payment.findOne({ orderId: req.params.id });
    // var dateFormat = require("dateformat");
    var date = new Date();
    var amount = req.query.amount;
    var desc =
        "Thanh toan don hang Van Transport thoi gian: " +
        // dateFormat(date, "yyyy-mm-dd HH:mm:ss");
        res.render("order", {
            title: "Hóa đơn Van Transport",
            amount: ~~amount,
            description: desc,
        });
});

exports.postPaymentURL = asyncErrorHandler(async (req, res, next) => {
    var ipAddr =
        req.headers["x-forwarded-for"] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    var tmnCode = process.env.vnp_TmnCode;
    var secretKey = process.env.vnp_HashSecret;
    var vnpUrl = process.env.vnp_Url;
    var returnUrl = process.env.vnp_ReturnUrl;

    var date = new Date();
    // var dateFormat = require("dateformat");
    // var createDate = dateFormat(date, "yyyymmddHHmmss");
    // var orderId = dateFormat(date, "HHmmss");
    var amount = req.body.amount;
    var bankCode = req.body.bankCode;

    var orderInfo = req.body.orderDescription;
    var orderType = req.body.orderType;
    var locale = req.body.language;
    if (locale === null || locale === "") {
        locale = "vn";
    }
    var currCode = "VND";
    var vnp_Params = {};
    vnp_Params["vnp_Version"] = "2";
    vnp_Params["vnp_Command"] = "pay";
    vnp_Params["vnp_TmnCode"] = tmnCode;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params["vnp_Locale"] = locale;
    vnp_Params["vnp_CurrCode"] = currCode;
    vnp_Params["vnp_TxnRef"] = orderId;
    vnp_Params["vnp_OrderInfo"] = orderInfo;
    vnp_Params["vnp_OrderType"] = orderType;
    vnp_Params["vnp_Amount"] = amount * 100;
    vnp_Params["vnp_ReturnUrl"] = returnUrl;
    vnp_Params["vnp_IpAddr"] = ipAddr;
    vnp_Params["vnp_CreateDate"] = createDate;
    if (bankCode !== null && bankCode !== "") {
        vnp_Params["vnp_BankCode"] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    var signData =
        secretKey + querystring.stringify(vnp_Params, { encode: false });

    var sha256 = require("sha256");

    var secureHash = sha256(signData);

    vnp_Params["vnp_SecureHashType"] = "SHA256";
    vnp_Params["vnp_SecureHash"] = secureHash;
    vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: true });

    //Neu muon dung Redirect thi dong dong ben duoi
    res.status(200).json({ code: "00", data: vnpUrl });
    //Neu muon dung Redirect thi mo dong ben duoi va dong dong ben tren
    //res.redirect(vnpUrl)
});
exports.getVNPayReturn = asyncErrorHandler(async (req, res, next) => {
    var vnp_Params = req.query;

    var secureHash = vnp_Params["vnp_SecureHash"];

    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    vnp_Params = sortObject(vnp_Params);

    var tmnCode = process.env.vnp_TmnCode;
    var secretKey = process.env.vnp_HashSecret;
    var vnpUrl = process.env.vnp_Url;
    var returnUrl = process.env.vnp_ReturnUrl;

    var signData =
        secretKey + querystring.stringify(vnp_Params, { encode: false });

    var checkSum = sha256(signData);

    if (secureHash === checkSum) {
        //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
        res.render("success", { code: vnp_Params["vnp_ResponseCode"] });
    } else {
        res.render("success", { code: "97" });
    }
});
exports.getVNPayIPN = asyncErrorHandler(async (req, res, next) => {
    var vnp_Params = req.query;
    var secureHash = vnp_Params["vnp_SecureHash"];

    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];
    var tmnCode = process.env.vnp_TmnCode;
    var secretKey = process.env.vnp_HashSecret;
    var vnpUrl = process.env.vnp_Url;
    var returnUrl = process.env.vnp_ReturnUrl;

    vnp_Params = sortObject(vnp_Params);
    var signData =
        secretKey + querystring.stringify(vnp_Params, { encode: false });

    var checkSum = sha256(signData);

    if (secureHash === checkSum) {
        var orderId = vnp_Params["vnp_TxnRef"];
        var rspCode = vnp_Params["vnp_ResponseCode"];
        //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
        res.status(200).json({ RspCode: "00", Message: "success" });
    } else {
        res.status(200).json({ RspCode: "97", Message: "Fail checksum" });
    }
});
