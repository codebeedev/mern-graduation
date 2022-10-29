import { Button, Input, message, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  clearErrors,
  getCategoryDetails,
  updateCategory,
} from '../../../redux/actions/categoryAction';
import { UPDATE_CATEGORY_RESET } from '../../../redux/types/categoryTypes';
import Layout from '../Layout';

const UpdateCategory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, category } = useSelector((state) => state.categoryDetails);
  const { loading, error: updateError, isUpdated } = useSelector((state) => state.category);

  const [name, setName] = useState('');
  useEffect(() => {
    if (category && category._id !== id) {
      dispatch(getCategoryDetails(id));
    } else {
      setName(category?.name);
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
      message.success('cập nhật loại sản phẩm thành công');
      navigate('/admin');
      dispatch({ type: UPDATE_CATEGORY_RESET });
    }
  }, [dispatch, error, navigate, isUpdated, id, category, updateError]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set('name', name);
    dispatch(updateCategory(id, myForm));
  };

  return (
    <Layout breadcrumb={['Loại sản phẩm', 'Cập nhật loại sản phẩm']}>
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
            <Button type="primary" block className="mt-3" onClick={handleUpdate}>
              Thêm loại sản phẩm
            </Button>
          </div>
        </Spin>
      </div>
    </Layout>
  );
};

export default UpdateCategory;
