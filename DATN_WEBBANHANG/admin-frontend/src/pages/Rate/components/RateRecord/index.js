import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Col, Rate, Row, Switch } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.scss";

const RateRecord = ({ data, onClick }) => {
  const [rateStatus, setRateStatus] = useState(data.status);

  return (
    <div className="rate__record">
      <Row>
        <Col xl={14} lg={14} md={14} sm={24} xs={24}>
          <div className="title__record-info__section">
            <Row>
              <Col xl={8} lg={8} sm={8} md={8} xs={8}>
                <div onClick={onClick} className="info-value title">
                  {data.user?.last_name + " " + data.user?.first_name}
                </div>
              </Col>
              <Col xl={8} lg={8} sm={8} md={8} xs={8}>
                <Rate
                  value={data.stars}
                  allowHalf
                  disabled
                  style={{ fontSize: 14 }}
                />
              </Col>
              <Col xl={8} lg={8} sm={8} md={8} xs={8}>
                <div className="info-value title">
                  <Link to={`/products/${data.product_id?.slug}`}>
                    {data.product_id?.name}
                  </Link>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        <Col xl={6} lg={6} sm={6} md={6} xs={6}></Col>
        <Col xl={4} lg={4} md={4} sm={24} xs={24}>
          <div className="title__record-action__section">
            <Row>
              <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                <div onClick={onClick} className="actions-value">
                  <EditFilled style={{ color: "#1890ff" }} />
                </div>
              </Col>
              <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                <div className="actions-value">
                  <DeleteFilled style={{ color: "var(--my-red)" }} />
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default RateRecord;
