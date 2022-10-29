import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Typography, Button, Modal, Table, message } from "antd";
import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  deleteDiscountProduct,
  getAllDiscountProduct,
  getDiscountDetail,
  updateDiscount,
} from "../../../redux/actions/discountAction";
import { formatPrice } from "../../../utils/products";
import Layout from "../Layout";
import PopupDiscount from "./PopupDiscount";
import PopupProduct from "./PopupProduct";

const { Title } = Typography;

const UpdateDiscount = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { discount, loading: loadingDetail } = useSelector((state) => state.discountDetail);
  const { loading } = useSelector((state) => state.discount);
  const { discountProducts } = useSelector((state) => state.discountProducts);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible02, setIsModalVisible02] = useState(false);

  const deleteProductHandler = async (productId) => {
    await dispatch(deleteDiscountProduct(id, productId));
    await dispatch(getDiscountDetail(id));
  };

  useEffect(() => {
    dispatch(getDiscountDetail(id));
    dispatch(getAllDiscountProduct());
  }, [dispatch, id]);

  const addProduct = async (productId) => {
    await dispatch(updateDiscount(id, { productId }));
    await dispatch(getDiscountDetail(id));
    await dispatch(getAllDiscountProduct());
  };

  const columns = [
    {
      dataIndex: "name",
      title: "Tên sản phẩm",
      width: 400,
    },
    {
      dataIndex: "stock",
      title: "Số lượng còn",
      sorter: (a, b) => a.stock - b.stock,
    },

    {
      dataIndex: "price",
      title: "Giá",
      sorter: (a, b) => a.price - b.price,
    },
    {
      dataIndex: "amount",
      title: "Giảm",
    },
    {
      dataIndex: "afterPrice",
      title: "Giá sau khi giảm",
    },

    {
      dataIndex: "key",
      title: "Hoạt động",
      render: (text, record, index) => {
        return (
          <Fragment>
            <Button
              type="text"
              className="me-3"
              onClick={async () => {
                sessionStorage.setItem(
                  "product",
                  JSON.stringify({
                    id: record.id,
                    price: record.priceTransfer,
                    amount: record.amountTransfer,
                    isPresent: record.isPresent,
                  })
                );
                await setIsModalVisible02(true);
              }}
            >
              <EditOutlined />
            </Button>
            <Button type="text" onClick={() => deleteProductHandler(text)}>
              <DeleteOutlined style={{ color: "red" }} />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  discount &&
    discount.products.forEach((item) => {
      rows.push({
        key: item.productId._id,
        id: item.productId._id,
        stock: item.productId.Stock,
        priceTransfer: item.productId.price,
        isPresent: item.isPresent || true,
        amountTransfer: item.amount || "",
        price: formatPrice(item.productId.price),
        name: item.productId.name,
        amount: item.amount ? (item.isPresent ? item.amount + "%" : formatPrice(item.amount)) : 0,
        afterPrice: item.amount
          ? formatPrice(
              item.isPresent
                ? (Number(item.productId.price) * (100 - Number(item.amount))) / 100
                : Number(item.productId.price) - Number(item.amount)
            )
          : formatPrice(item.productId.price),
      });
    });

  const handleUpdateDiscount = async (productId, isPresent, amount) => {
    if (isPresent === true && amount > 100) {
      message.error("% không được vượt quá 100 %");
      return;
    }
    await dispatch(updateDiscount(id, { productId, isPresent, amount }));
    await dispatch(getDiscountDetail(id));
  };

  return (
    <>
      <Layout breadcrumb={["Cập nhật chương trình giảm giá"]}>
        <Title level={3}>{discount && discount.name}</Title>
        <div>
          <span className="fw-bold me-2">Thời gian:</span>
          <span>{discount && moment(discount.expireDate).format("MM/DD/YYYY HH:mm")}</span>
        </div>

        <div className="mt-5">
          <div
            className="d-flex justify-content-between pt-3"
            style={{ borderTop: "1px solid #eee" }}
          >
            <Title level={4}>Sản phẩm</Title>
            <Button
              className="d-flex align-items-center"
              icon={<PlusCircleOutlined />}
              onClick={() => setIsModalVisible(true)}
            >
              Thêm sản phẩm
            </Button>
          </div>
          <div className="mt-3">
            <Table columns={columns} dataSource={rows} size="small" />
          </div>
        </div>
      </Layout>
      <Modal
        width={"70%"}
        style={{ top: 20, overflow: "auto" }}
        title="Sản phẩm"
        visible={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
      >
        <PopupProduct
          products={discountProducts}
          addProduct={addProduct}
          loading={loading}
          loadingDetail={loadingDetail}
        />
      </Modal>
      <Modal
        title="Cập nhật giảm giá"
        visible={isModalVisible02}
        onOk={() => setIsModalVisible02(false)}
        onCancel={() => setIsModalVisible02(false)}
        footer={null}
      >
        <PopupDiscount loading={loading} updateDiscount={handleUpdateDiscount} />
      </Modal>
    </>
  );
};

export default UpdateDiscount;
