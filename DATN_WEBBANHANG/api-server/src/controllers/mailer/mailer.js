const { json } = require('express/lib/response')
const mailer = require('../../mailer');
const orderModel = require('../../models/order.model');
const order_itemModel = require('../../models/order_item.model');
const userModel = require('../../models/user.model');
// const Carts = require('../../Model/carts.model')
// const History = require('../../Model/histories.model')

function getPriceProduct(productObj) {
    return parseInt(productObj?.quantity) * parseInt(productObj?.product?.price - ((productObj?.product?.price * productObj?.product?.sale_percent) / 100));
}

function formatPrice(value) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
}

function concatAdress(addressObj) {
    return ` ${addressObj?.street}, ${addressObj?.ward?.name}, ${addressObj?.district?.name}, ${addressObj?.province?.name}`
}

module.exports.sendmail = async (req, res) => {

    const { orderItems, order_id } = req.body;

    console.log(orderItems, order_id);
    const responseOrderModel = await orderModel.findOne({ _id: order_id })

    const { address, _id, order_status, payment_type, user } = responseOrderModel;
    // const responseOrderItem = await orderItems.findOne({ _id: order_id })
    console.log('responseOrderModel', responseOrderModel)
    // console.log('responseOrderItem', responseOrderItem)

    // const { user_id } = req.body[0];
    // console.log(user_id, order_id)

    const infoUserId = await userModel.findOne({ _id: user })
    console.log(infoUserId)

    const newOrderList = [...orderItems];

    try {
        // Lấy data truyền lên từ form phía client
        const to = infoUserId?.email;
        const subject = `Hóa Đơn Đặt Hàng Mã #${_id}`
        const fullname = `${infoUserId?.first_name} ${infoUserId?.last_name}`
        // const phone = '5951071017'
        const addressRender = concatAdress(address);

        // const idUser = 'z'
        const status = false
        let total = 0
        newOrderList.map(value => {
            // return total += parseInt(value.quantity) * parseInt(value.product.price - ((value.product.price * value.product.sale_percent) / 100))
            return total += getPriceProduct(value);
        })

        const htmlHead = '<table style="width:50%">' +
            '<tr style="border: 1px solid black;"><th style="border: 1px solid black;">Tên Sản Phẩm</th><th style="border: 1px solid black;">Hình Ảnh</th><th style="border: 1px solid black;">Giá</th><th style="border: 1px solid black;">Số Lượng</th><th style="border: 1px solid black;">Thành Tiền</th>'

        let htmlContent = ""

        for (let i = 0; i < newOrderList.length; i++) {
            htmlContent += '<tr>' +
                '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">' + newOrderList[i].product.name + '</td>' +
                '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;"><img src="' + newOrderList[i].product.thumbnail_url + '" width="80" height="80"></td>' +
                '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">' + formatPrice(newOrderList[i].product.price) + '</td>' +
                '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">' + newOrderList[i].quantity + '</td>' +
                '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">' + formatPrice(getPriceProduct(newOrderList[i])) + '</td><tr>'
        }

        const htmlResult = '<h2>Xin Chào: ' + fullname + '</h2>' + '<h3> Địa chỉ giao hàng: ' + addressRender + '</h3>' + '<h3> Hình thức thanh toán: ' + payment_type + '</h3>' + '<h3> Chi tiết đơn hàng: </h3>' +
            htmlHead + htmlContent + '<h2>Tổng Thanh Toán: ' + formatPrice(total) + '</br>' + '<p>Cảm ơn bạn!</p>'

        // Thực hiện gửi email (to, subject, htmlContent)
        await mailer.sendMail(to, subject, htmlResult)

        return res.json({ message: 'Successfully' })
    } catch (error) {
        // Nếu có lỗi thì log ra để kiểm tra và cũng gửi về client
        return res.send(error);
    }

}

