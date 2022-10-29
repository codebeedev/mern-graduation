require("dotenv").config();
import nodemailer from "nodemailer";
import db from "../models";

let sendEmail = async (dataSend) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Smile Travel" <xiao78.py@gmail.com>', // sender address
    to: dataSend.email, // list of receivers
    subject: "Smile Travel thông báo thông tin xác nhận đặt tour", // Subject line
    html: `
    <h3>Xin chào ${dataSend.name}! </h3>
    <p>Bạn nhận được email này vì đã đặt tour online tại Smile Travel vui lòng xác nhận thông tin dưới đây:</p>
    <p>Thông tin xác nhận:</p>
    <div><b>Số điện thoại: ${dataSend.phonenumber}</b></div>
    <div><b>Địa chỉ: ${dataSend.address}</b></div>
    <div><b>Mã tour: ${dataSend.tourId}</b></div>
    <div><b>Tên tour: ${dataSend.tourName}</b></div>
    <div><b>Ngày đi: ${dataSend.startdate}</b></div>
    <div><b>Số khách: ${dataSend.amount}</b></div>
    <div><b>Hình thức thanh toán: ${dataSend.pay}</b></div>
    <div><b>Tổng tiền phải thanh toán: ${dataSend.price}đ</b></div>
    <p>Nếu thông tin đúng sự thật xin vui lòng bấm xác nhận để hoàn tất xác nhận đặt tour.</p>
    <p>Nếu trong 30 phút bạn không sát nhận thì thông tin của bạn sẽ bị xóa</p>
    <p>Sau khi đặt tour nhân viên sẽ gọi cho quý khách để xác nhận, tình trạng chuyến đi và bổ sung thông tin cần thiết.</p>
    <p>Quý khách vui lòng thanh toán 50% tổng tiền 7 ngày trước khi khởi hành.</p>
    <div>
    <p>Xin chân thành cảm ơn!</p>
    <a href=${dataSend.link} target="_blank">Xác Nhận</a>
    </div>
    `, // html body
  });

  setTimeout(function () {
    return new Promise(async (resolve, reject) => {
      try {
        let n = await db.BookTour.findOne({
          where: {
            id: dataSend.id,
            statusId: "S1",
          },
        });
        if (n) {
          await n.destroy();
          resolve("true");
        } else {
          resolve("false");
        }
      } catch (e) {
        reject(e);
      }
    });
  }, 1800000);
};

module.exports = {
  sendEmail: sendEmail,
};
