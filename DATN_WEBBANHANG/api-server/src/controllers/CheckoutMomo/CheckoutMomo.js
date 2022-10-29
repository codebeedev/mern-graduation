//https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
//parameters
module.exports.checkoutMomo = async (request, response) => {
    var partnerCode = "MOMOVODQ20210606";
    var accessKey = "h3FDGoHfQ33rXtzF";
    var secretkey = "f1HNQhGXfXfxxXRTi3Wfkaek7jIFBg8U";
    var requestId = partnerCode + new Date().getTime();
    var orderId = requestId;
    var orderInfo = "checkout-with-momo";
    var redirectUrl = "http://localhost:3000/success";
    var ipnUrl = "http://localhost:3000/success";
    // var ipnUrl = redirectUrl = "https://webhook.site/454e7b77-f177-4ece-8236-ddf1c26ba7f8";
    var amount = "1000";
    var requestType = "captureWallet"
    var extraData = ""; //pass empty value if your merchant does not have stores

    //before sign HMAC SHA256 with format
    //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
    var rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType
    //puts raw signature
    console.log("--------------------RAW SIGNATURE----------------")
    console.log(rawSignature)
    //signature
    const crypto = require('crypto');
    var signature = crypto.createHmac('sha256', secretkey)
        .update(rawSignature)
        .digest('hex');
    console.log("--------------------SIGNATURE----------------")
    console.log(signature)

    //json object send to MoMo endpoint
    const requestBody = JSON.stringify({
        partnerCode: partnerCode,
        accessKey: accessKey,
        requestId: requestId,
        amount: amount,
        orderId: orderId,
        orderInfo: orderInfo,
        redirectUrl: redirectUrl,
        ipnUrl: ipnUrl,
        extraData: extraData,
        requestType: requestType,
        signature: signature,
        lang: 'en'
    });
    //Create the HTTPS objects
    const https = require('https');
    const options = {
        hostname: 'test-payment.momo.vn',
        port: 443,
        path: '/v2/gateway/api/create',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(requestBody)
        }
    }
    //Send the request and get the response
    const req = https.request(options, res => {
        // console.log(`Status: ${res.statusCode}`);
        // console.log(`Headers: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', (body) => {
            // console.log('Body: ');
            // console.log(body);
            // console.log('payUrl: ');
            // console.log(JSON.parse(body).payUrl);
            // console.log(JSON.parse(body).resultCode)
            // payUrlMomo = JSON.parse(body).payUrl;
            // const optionsStateMomo = {
            //     hostname: '',
            //     port: 443,
            //     path: JSON.parse(body).payUrl,
            //     method: 'GET',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     }
            // }
            // const resultStateMomo = https.request(optionsStateMomo, responseStateMomo => {
            //     responseStateMomo.setEncoding('utf8');
            //     responseStateMomo.on('data', body => {
            //         console.log(JSON.parse(body).resultCode)
            //         response.status(200).json({ resultCode: JSON.parse(body).resultCode })
            //     })
            // })
            response.status(200).json({ payUrl: JSON.parse(body).payUrl })
        });

        res.on('end', () => {
            console.log('No more data in response.');
        });
    })

    req.on('error', (e) => {
        response.status(404).json({ message: e.message })
        console.log(`problem with request: ${e.message}`);
    });
    // write data to request body
    console.log("Sending....")
    req.write(requestBody);

    req.end();
}

