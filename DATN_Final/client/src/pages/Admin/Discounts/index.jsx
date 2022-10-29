import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, message, Spin, Table, Tag } from "antd";
import moment from "moment";
import React, { Fragment } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearErrors, deleteDiscount, getDiscounts } from "../../../redux/actions/discountAction";
import { DELETE_DISCOUNT_RESET } from "../../../redux/types/discountType";
import Layout from "../Layout";

const Discounts = () => {
  const dispatch = useDispatch();

  const { loading, discounts } = useSelector((state) => state.discounts);
  const { error, isDeleted, loading: deleteLoading } = useSelector((state) => state.discount);

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      message.success("Xoá mã giảm giá thành công");
      dispatch({ type: DELETE_DISCOUNT_RESET });
    }

    dispatch(getDiscounts());
  }, [dispatch, error, isDeleted]);

  const deleteCategoryHandler = (id) => {
    dispatch(deleteDiscount(id));
  };

  const columns = [
    {
      dataIndex: "code",
      title: "Mã",
    },
    {
      dataIndex: "name",
      title: "Tên chương trình",
    },
    {
      dataIndex: "status",
      title: "Trạng thái",
      render: (status) => {
        return (
          <Tag color={status ? "green" : "processing"}>
            {status ? "Đang hoạt động" : "Đã kết thúc"}
          </Tag>
        );
      },
      filters: [
        {
          text: "Đang hoạt động",
          value: true,
        },
        {
          text: "Đã kết thúc",
          value: false,
        },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      dataIndex: "expireDate",
      title: "Hạn",
      sorter: (a, b) => moment(a.expireDate) - moment(b.expireDate),
    },

    {
      dataIndex: "key",
      title: "Hoạt động",
      render: (id) => {
        return (
          <Fragment>
            <Link className="me-3" to={`/admin/discount/${id}`}>
              <EditOutlined />
            </Link>
            <Button type="text" onClick={() => deleteCategoryHandler(id)}>
              <DeleteOutlined style={{ color: "red" }} />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const data = [];
  discounts &&
    discounts.forEach((dis) => {
      data.push({
        key: dis._id,
        code: dis.code,
        status: new Date(dis.expireDate).toISOString() > new Date().toISOString(),
        name: dis.name,
        expireDate: moment(dis.expireDate).format("YYYY-MM-DD HH:mm"),
      });
    });

  return (
    <Layout breadcrumb={["Mã giảm giá"]}>
      <Spin spinning={loading}>
        <Spin spinning={deleteLoading}>
          <Table columns={columns} dataSource={data} />
        </Spin>
      </Spin>
    </Layout>
  );
};

export default Discounts;
