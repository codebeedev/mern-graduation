import React, { useEffect, useState } from 'react';
import './styles.scss';
import { Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../redux/actions/categoryAction';
import { createSearchParams, useNavigate ,useSearchParams} from "react-router-dom";


const { Option } = Select;

const priceSelect = [
  [0, 100000000],
  [0, 1000000],
  [1000000, 2000000],
  [2000000, 3000000],
  [3000000, 4000000],
  [4000000, 100000000],
];


const FilterProducts = ({ setPrice, setCategory, setCurrentPage }) => {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.categories);
  const [cateId ]= useState(searchParams.get('cate'));

  function handleChangePrice(value) {
    setPrice(priceSelect[value]);
    setCurrentPage(1);
  }

  function handleChangeCategory(value) {
    setCategory(value === 'default' ? '' : value);
    setCurrentPage(1);
    navigate({
      
      search: createSearchParams({
          cate: value
      }).toString()


    
  });

  }

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className="filterProducts">
      <div className="container">
        <div className="d-flex justify-content-between py-3">
          <div className="filterProducts-filter">
            <Select defaultValue={cateId||"default"} style={{ width: 230 }} onChange={handleChangeCategory}>
              <Option value="default">Loại sản phẩm</Option>
              {categories &&
                categories.map((category) => (
                  <Option key={category._id} value={category._id}>
                    {category.name}
                  </Option>
                ))}
          
            </Select>

            <Select
              className="ms-5"
              defaultValue={0}
              style={{ width: 230 }}
              onChange={handleChangePrice}
            >
              <Option value={0}>Giá</Option>
              <Option value={1}>Dưới 1,000,000₫</Option>
              <Option value={2}>1,000,001₫ - 2,000,000₫</Option>
              <Option value={3}>2,000,001₫ - 3,000,000₫</Option>
              <Option value={4}>3,000,001₫ - 4,000,000₫</Option>
              <Option value={5}>Trên 4,000,000₫</Option>
            </Select>
          </div>
          <div className="filterProducts-sort"></div>
        </div>
      </div>
    </div>
  );
};

export default FilterProducts;
