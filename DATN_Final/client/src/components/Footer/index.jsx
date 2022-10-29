import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from '@ant-design/icons';
import { Button, Input } from 'antd';
import React from 'react';
import './styles.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <ul className="d-flex gap-3">
              <li>
                <FacebookOutlined />
              </li>
              <li>
                <YoutubeOutlined />
              </li>
              <li>
                <TwitterOutlined />
              </li>
              <li>
                <InstagramOutlined />
              </li>
            </ul>
          </div>
          <div className="col-md-6">
            <h4>Nhận tin mới từ Pandora</h4>
            <p>
              Đăng kí ngay để nhận thông tin mới nhất về khuyến mãi, sự kiện, offer... từ Pandora.
            </p>
            <Input.Group compact>
              <Input size="large" style={{ width: 'calc(100% - 200px)' }} placeholder="Email" />
              <Button size="large">Gửi</Button>
            </Input.Group>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-3">
            <h5 className="fw-bold">GIỚI THIỆU</h5>
            <ul>
              <li>Về Pandora</li>
              <li>Câu chuyện Pandora</li>
              <li>Về Tập Đoàn Norbreeze</li>
              <li>Liên hệ</li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5 className="fw-bold">ĐIỀU KHOẢN & DỊCH VỤ</h5>
            <ul>
              <li>Câu hỏi thường gặp</li>
              <li>Chính sách đổi hàng</li>
              <li>Chính sách bảo mật</li>
              <li>Chính sách bảo hành</li>
              <li>Chính sách thanh toán</li>
              <li>Chính sách giao nhận</li>
              <li>Chính sách làm sạch , sửa chữa</li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5 className="fw-bold">HỆ THỐNG CỬA HÀNG</h5>
            <ul>
              <li>Hồ Chí Minh</li>
              <li>Hà Nội</li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5 className="fw-bold">GIAO HÀNG</h5>
            <ul>
              <li>VNPost</li>
              <li>Nhất Tín Logistics</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
