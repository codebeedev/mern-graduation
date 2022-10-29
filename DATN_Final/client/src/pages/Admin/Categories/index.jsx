import { Button, Input, message, Space, Spin, Table } from 'antd';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearErrors, deleteCategory, getCategories } from '../../../redux/actions/categoryAction';
import { DELETE_CATEGORY_RESET } from '../../../redux/types/categoryTypes';
import Layout from '../Layout';
import Highlighter from 'react-highlight-words';

const Categories = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { error, isDeleted, loading } = useSelector((state) => state.category);

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      message.success('Xoá loại sản phẩm thành công');
      dispatch({ type: DELETE_CATEGORY_RESET });
    }
    dispatch(getCategories());
  }, [dispatch, error, isDeleted]);

  const deleteCategoryHandler = (id) => {
    dispatch(deleteCategory(id));
  };

  // search
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Tìm kiếm ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            {/* Tìm */}
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Làm mới
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Lọc
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      dataIndex: 'id',
      title: 'Mã loại sản phẩm',
      ...getColumnSearchProps('id'),
    },
    {
      dataIndex: 'name',
      title: 'Tên loại sản phẩm',
      ...getColumnSearchProps('name'),
    },
    {
      dataIndex: 'key',
      title: 'Hoạt động',
      render: (id) => {
        return (
          <Fragment>
            <Link to={`/admin/category/${id}`}>
              <EditOutlined />
            </Link>

            <Button type="text" onClick={() => deleteCategoryHandler(id)}>
              <DeleteOutlined style={{ color: 'red' }} />
            </Button>
          </Fragment>
        );
      },
    },
  ];
  const rows = [];
  categories &&
    categories.forEach((category) => {
      rows.push({
        key: category._id,
        id: category._id,
        name: category.name,
      });
    });

  return (
    <Layout breadcrumb={['Loại sản phẩm']}>
      <Spin spinning={loading}>
        <Table columns={columns} dataSource={rows} />
      </Spin>
    </Layout>
  );
};

export default Categories;
