import { Button, Image, Input, InputNumber, message, Select, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getCategories } from "../../../redux/actions/categoryAction";
import {
  clearErrors,
  getProductDetails,
  updateProduct,
} from "../../../redux/actions/productAction";
import { UPDATE_PRODUCT_RESET } from "../../../redux/types/productTypes";
import Layout from "../Layout";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const { error, product } = useSelector((state) => state.productDetails);

  const { loading, error: updateError, isUpdated } = useSelector((state) => state.product);

  const { categories } = useSelector((state) => state.categories);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  useEffect(() => {
    if (product && product._id !== id) {
      dispatch(getProductDetails(id));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category._id);
      setStock(product.Stock);
      setOldImages(product.images);
    }
    if (error) {
      message.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      message.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      message.success("Cập nhật sản phẩm thành công!");
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }

    dispatch(getCategories());
  }, [dispatch, error, navigate, isUpdated, id, product, updateError]);

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateProduct(id, myForm));
  };

  return (
    <Layout breadcrumb={["Sản phẩm", "Cập nhật sản phẩm"]}>
      <div className="newProduct">
        <Spin spinning={loading}>
          <div className="newProduct-content">
            <div className="group-item">
              <label htmlFor="">Tên sản phẩm:</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="group-item mt-3">
              <label htmlFor="">Giá:</label>
              <InputNumber
                min={0}
                style={{ width: "100%" }}
                value={price}
                onChange={(value) => setPrice(value)}
              />
            </div>
            <div className="group-item mt-3">
              <label htmlFor="">Thông tin sản phẩm:</label>
              <Input.TextArea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>
            <div className="group-item mt-3">
              <label htmlFor="">Loại sản phẩm:</label>
              <Select
                style={{ width: "100%" }}
                placeholder="Loại sản phẩm"
                value={category}
                onChange={(value) => setCategory(value)}
              >
                {categories &&
                  categories.map((category) => (
                    <Select.Option key={category._id} value={category._id}>
                      {category.name}
                    </Select.Option>
                  ))}
              </Select>
            </div>
            <div className="group-item mt-3">
              <label htmlFor="">Số lượng:</label>
              <InputNumber
                value={Stock}
                onChange={(value) => setStock(value)}
                min={0}
                className="ms-3"
              />
            </div>
            <div className="group-item mt-3">
              <label htmlFor="">Hình ảnh:</label>
              <input
                className="upload-img"
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProductImagesChange}
                multiple
              />
              <div className="img-preview mt-3">
                <Image.PreviewGroup>
                  {oldImages.map((image, index) => (
                    <Image key={index} width={100} src={image.url} />
                  ))}
                  {imagesPreview.map((image, index) => (
                    <Image key={index} width={100} src={image} />
                  ))}
                </Image.PreviewGroup>
              </div>
            </div>
            <div className="d-flex justify-content-end mt-3">
              <Button onClick={updateProductSubmitHandler} type="primary" danger>
                Cập nhật sản phẩm
              </Button>
            </div>
          </div>
        </Spin>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
