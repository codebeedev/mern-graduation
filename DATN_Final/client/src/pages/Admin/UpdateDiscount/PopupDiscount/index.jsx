import { Button, InputNumber, Select, message } from "antd";
import React, { useEffect, useState } from "react";
import { formatPrice } from "../../../../utils/products";

const PopupDiscount = ({ updateDiscount, loading }) => {
  let product = JSON.parse(sessionStorage.getItem("product"));

  const [isPresent, setIsPresent] = useState(product.isPresent);
  const [amount, setAmount] = useState(product.amount);

  useEffect(() => {
    if (isPresent == false && amount > Number(product.price)) {
      message.error("Số lượng giảm không được vượt quá giá sản phẩm.");
    }
  }, [isPresent, amount, product]);

  return (
    <div>
      <div>
        <span>Giá tiền ban đầu: </span> <span>{product.price && formatPrice(product.price)}</span>
      </div>
      <label className="mt-3" htmlFor="">
        Hình thức giảm:{" "}
      </label>
      <Select className="d-block" value={isPresent} onChange={setIsPresent}>
        <Select.Option value={true}>Giảm theo %</Select.Option>
        <Select.Option value={false}>Giảm theo giá</Select.Option>
      </Select>
      <label className="mt-3" htmlFor="">
        Giảm:
      </label>
      <InputNumber
        value={amount}
        onChange={setAmount}
        className="d-block"
        style={{ width: "100%" }}
        placeholder={!isPresent ? "Giảm theo giá" : "Giảm theo % (1-100)"}
      />

      <div className="mt-3">
        <span>Giá tiền sau khi giảm: </span>{" "}
        <span>
          {product.price &&
            formatPrice(
              isPresent
                ? (Number(product.price) * (100 - Number(amount))) / 100
                : Number(product.price) - Number(amount)
            )}
        </span>
      </div>

      <Button
        loading={loading}
        onClick={() => updateDiscount(product.id, isPresent, amount)}
        className="mt-4"
        block
      >
        Cập nhật
      </Button>
    </div>
  );
};

export default PopupDiscount;
