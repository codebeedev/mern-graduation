import { Empty, message, Pagination, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import FilterProducts from '../../components/FilterProducts';
import ListProducts from '../../components/ListProducts';
import Title from '../../components/Title';
import { getProduct } from '../../redux/actions/productAction';
import './styles.scss';
import {useSearchParams  } from "react-router-dom";






const Products = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const { loading, error, products, filteredProductsCount, resultPerPage } = useSelector(
    (state) => state.products
  );

  const [searchParams] = useSearchParams();


  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 100000000]);
  const [category, setCategory] = useState(searchParams.get('cate'));

  useEffect(() => {
    if (error) {
      return message.error(error);
    }

    dispatch(getProduct(keyword, currentPage, price, category));
  }, [dispatch, currentPage, error, price, category, keyword]);

  const paginationChange = (page, pageSize) => {
    setCurrentPage(page);
  };

  
  /* console.log(searchParams.get('cate'));  */// 'name'
  return (
    <div className="products">
      <Title title="Miễn phí vận chuyển cho toàn bộ đơn hàng" />
      <FilterProducts
        setCurrentPage={setCurrentPage}
        setCategory={setCategory}
        setPrice={setPrice}
      />
      <Spin spinning={loading}>
        {products.length > 0 ? (
          <>
            <ListProducts products={products} />

            <div className="pagination mt-3 d-flex justify-content-center">
              <Pagination
                current={currentPage}
                onChange={paginationChange}
                pageSize={resultPerPage ? resultPerPage : 10} // Số lượng item hiển thị trên 1 page
                total={filteredProductsCount} // Tổng số lượng item
              />
            </div>
          </>
        ) : (
          <Empty />
        )}
      </Spin>
    </div>
  );
};

export default Products;
