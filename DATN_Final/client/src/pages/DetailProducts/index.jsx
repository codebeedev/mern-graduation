import { InputNumber, message, Rate, Spin, Typography } from "antd";
import React, { useEffect, useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Review from "../../components/Review";
import ReviewPost from "../../components/ReviewPost";
import { addItemsToCart } from "../../redux/actions/cartAction";
import { getProductDetails } from "../../redux/actions/productAction";
import { formatPrice } from "../../utils/products";
import "./styles.scss";
const { Title } = Typography;

const DetailProducts = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { product, loading, error } = useSelector((state) => state.productDetails);

  const { user } = useSelector((state) => state.user);

  const [quantity, setQuantity] = useState(1);

  const onChangeAmount = (value) => {
    setQuantity(value);
  };

  const addProduct = () => {
    if (product.Stock < 1) {
      message.error("Sản phẩm đã hết hàng.");
    } else if (product.Stock < quantity) {
      message.error("Không thể mua quá số lượng hàng đang còn.");
    } else {
      dispatch(addItemsToCart(id, quantity));
      message.success("Sản phẩm đã được thêm vào giỏ hàng");
    }
  };
  useEffect(() => {
    if (error) {
      return message.error(error);
    }

    dispatch(getProductDetails(id));
  }, [dispatch, error, id]);

  const checkDiscount = product.discount
    ? new Date(product.discount?.expireDate).toISOString() > new Date().toISOString()
    : false;

  const productDiscount = product.discount
    ? product.discount.products.find((val) => val.productId.toString() === product._id.toString())
    : null;

  const afterPrice =
    checkDiscount && productDiscount?.amount
      ? formatPrice(
          productDiscount?.isPresent
            ? (Number(product.price) * (100 - Number(productDiscount?.amount))) / 100
            : Number(product.price) - Number(productDiscount?.amount)
        )
      : formatPrice(product.price);

  return (
    <Spin spinning={loading}>
      <div className="detailProduct">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="detailProduct-img">
                {product.images &&
                  product.images.map((img) => (
                    <InnerImageZoom src={img.url} zoomSrc={img.url} key={img._id} />
                  ))}
              </div>
            </div>

            <div className="col-md-4">
              <div className="detailProduct-info">
                <div className="detailProduct-info-lable">
                  <span></span>
                </div>

                <h1 className="detailProduct-info-title">{product.name}</h1>

                <div className="my-3 text-center">
                  <b className="pe-2">Số lượng : </b>
                  <span>{product.Stock >= 1 ? product.Stock : "Hết hàng"}</span>
                </div>

                <div
                  className={`detailProduct-info-price d-flex ${
                    checkDiscount ? "justify-content-around" : "justify-content-center"
                  }`}
                >
                  {checkDiscount && (
                    <span className="price-before">{formatPrice(product.price)}</span>
                  )}
                  <b>{afterPrice}</b>
                </div>

                <div className="d-flex justify-content-center align-items-center mt-3">
                  <Rate
                    className="me-2"
                    style={{ fontSize: "16px" }}
                    disabled
                    value={product.ratings}
                  />
                  ({product.numOfReviews} Đánh giá)
                </div>

                <div className="text-center mt-3">
                  <InputNumber
                    min={1}
                    max={product.Stock}
                    defaultValue={1}
                    onChange={onChangeAmount}
                  />
                </div>

                <div className="detailProduct-info-action">
                  <button onClick={addProduct} id="addcart">
                    Thêm vào giỏ
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="detailProduct-body">
            <div className="detailProduct-content">
              <Title level={3}>Thông tin sản phẩm</Title>

              <div className="detailProduct-content-wrap">
                <p>
                  <b>
                    <u>Thông tin sản phẩm:</u>
                  </b>
                  <br />
                  {product.description}
                </p>
              </div>

              <div className="detailProduct-content-review mt-3">
                <Title level={3}>Đánh giá sản phẩm</Title>
                <div className="mt-3">
                  {user?.purchased?.find((pur) => pur.product.toString() === id.toString()) && (
                    <ReviewPost id={id} />
                  )}

                  {product.reviews && product.reviews[0] ? (
                    product.reviews.map((review) => <Review key={review._id} review={review} />)
                  ) : (
                    <div className="mt-3 text-center">Chưa có đánh giá nào</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default DetailProducts;
