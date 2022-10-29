import {
  DollarCircleOutlined,
  ScheduleOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import COMMON_API from "../../api/common";
import { STATUS_OK } from "../../constants/api";
import { formatNumber } from "../../utils";
import LineChartComponent from "./components/LineChart";
import BarChartComponent from "./components/BarChart";
import StatsViewer from "./components/StatsViewer";
import "./style.scss";

const OverallPage = () => {
  const [statisticData, setStatisticData] = useState({});

  useEffect(() => {
    (async function () {
      try {
        const response = await COMMON_API.getStatistic();

        if (response.status === STATUS_OK) setStatisticData(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  console.log(statisticData.topSold);
  console.log(statisticData.brandStatistic);
  console.log(statisticData.topRate);

  const topSoldData = statisticData.topSold?.map((item) => {
    return {
      name: item.name,
      uv: item.sold,
      amt: item.sold,
    };
  });

  const topBrandData = statisticData.brandStatistic?.map((item) => {
    return {
      name: item._id,
      uv: item.totalSold,
      amt: item.rate,
    };
  });

  const topRate = statisticData.topRate?.map((item) => {
    return {
      name: item.name,
      uv: item.rate,
      amt: item.rate,
    };
  });

  return (
    <div id="overall__page">
      <div className="stats__viewer-wrapper">
        <Row gutter={16}>
          <Col span={8}>
            <StatsViewer
              title={"Đơn hàng"}
              iconEl={
                <ScheduleOutlined style={{ color: "white", fontSize: 20 }} />
              }
              color={"green"}
              description="Tổng số đơn hàng trong 30 ngày cuối"
              value={statisticData.totalOrdersInMonth}
            />
          </Col>
          <Col span={8}>
            <StatsViewer
              title={"Doanh thu"}
              iconEl={
                <DollarCircleOutlined
                  style={{ color: "white", fontSize: 20 }}
                />
              }
              color={"green"}
              description="Tổng doanh thu trong 30 ngày cuối"
              value={formatNumber(statisticData.totalAmountInMonth) + "đ"}
            />
          </Col>
          <Col span={8}>
            <StatsViewer
              title={"Nguời dùng"}
              iconEl={
                <UsergroupAddOutlined
                  style={{ color: "white", fontSize: 20 }}
                />
              }
              color={"green"}
              description="Tổng số người dùng mới trong 30 ngày cuối"
              value={statisticData.totalUsersInMonth}
            />
          </Col>
        </Row>
      </div>
      {topSoldData && (
        <div className="line__chart-wrapper">
          <BarChartComponent data={topSoldData} title={"Sản phẩm bán chạy"} />
        </div>
      )}
      {topRate && (
        <div className="line__chart-wrapper">
          <BarChartComponent data={topRate} title={"Sản phẩm được yêu thích nhiều"} />
        </div>
      )}
      {topBrandData && (
        <div className="line__chart-wrapper">
          <BarChartComponent data={topBrandData} title="Nhãn hàng hot" />
        </div>
      )}
    </div>
  );
};

export default OverallPage;
