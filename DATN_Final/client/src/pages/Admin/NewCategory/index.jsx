import { Button, Input, message, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearErrors, createCategory } from '../../../redux/actions/categoryAction';
import { NEW_CATEGORY_RESET } from '../../../redux/types/categoryTypes';
import Layout from '../Layout';

const NewCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newCategory);

  const [name, setName] = useState();

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      message.success('Thêm loại sản phẩm thành công!');
      navigate('/admin');
      dispatch({ type: NEW_CATEGORY_RESET });
    }
  }, [dispatch, error, success, navigate]);

  const handleAdd = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set('name', name);
    dispatch(createCategory(myForm));
  };

  return (
    <Layout breadcrumb={['Loaị sản phẩm', 'Thêm loại sản phẩm']}>
      <div className="newCategory">
        <Spin spinning={loading}>
          <div
            className="newCategory-content"
            style={{
              width: '500px',
              margin: '10px auto 50px',
              boxShadow: ' rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
              padding: '50px',
            }}
          >
            <label>Tên loại sản phẩm : </label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
            <Button type="primary" block className="mt-3" onClick={handleAdd}>
              Thêm loại sản phẩm
            </Button>
          </div>
        </Spin>
      </div>
    </Layout>
  );
};

export default NewCategory;
