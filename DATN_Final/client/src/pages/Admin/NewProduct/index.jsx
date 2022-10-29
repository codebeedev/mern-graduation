import { Button, Image, Input, InputNumber, message, Select, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../../redux/actions/categoryAction";
import { clearErrors, createProduct } from "../../../redux/actions/productAction";
import { NEW_PRODUCT_RESET } from "../../../redux/types/productTypes";
import Layout from "../Layout";
import "./styles.scss";

const NewProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newProduct);
  const { categories } = useSelector((state) => state.categories);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      message.success("Thêm sản phẩm thành công!");
      navigate("/admin");
      dispatch({ type: NEW_PRODUCT_RESET });
    }

    dispatch(getCategories());
  }, [dispatch, error, success, navigate]);

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

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

  const createProductSubmitHandler = (e) => {
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
    dispatch(createProduct(myForm));
  };

  function handleChangeCategory(value) {
    setCategory(value === "default" ? "" : value);
  }

  return (
    <Layout breadcrumb={["Sản phẩm", "Thêm sản phẩm"]}>
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
                onChange={handleChangeCategory}
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
                min={0}
                value={Stock}
                onChange={(value) => setStock(value)}
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
                onChange={createProductImagesChange}
                multiple
              />
              <div className="img-preview mt-3">
                <Image.PreviewGroup>
                  {imagesPreview.map((image, index) => (
                    <Image key={index} width={100} src={image} />
                  ))}
                </Image.PreviewGroup>
              </div>
            </div>
            <div className="d-flex justify-content-end mt-3">
              <Button onClick={createProductSubmitHandler} type="primary" danger>
                Thêm sản phẩm
              </Button>
            </div>
          </div>
        </Spin>
      </div>
    </Layout>
  );
};

export default NewProduct;
