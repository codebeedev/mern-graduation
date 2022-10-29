import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, message, Space, Spin, Table } from 'antd';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearErrors, deleteProduct, getAdminProduct } from '../../../redux/actions/productAction';
import { DELETE_PRODUCT_RESET } from '../../../redux/types/productTypes';
import { formatPrice } from '../../../utils/products';
import Layout from '../Layout';
import Highlighter from 'react-highlight-words';

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, products } = useSelector((state) => state.products);

  const { error: deleteError, isDeleted, loading } = useSelector((state) => state.product);

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      message.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      message.success('Xoá sản phẩm thành công!');
      navigate('/admin');
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [dispatch, error, deleteError, navigate, isDeleted]);

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
    { dataIndex: 'id', title: 'Mã sản phẩm', ...getColumnSearchProps('id') },

    {
      dataIndex: 'name',
      title: 'Tên sản phẩm',
      ...getColumnSearchProps('name'),
    },
    {
      dataIndex: 'stock',
      title: 'Số lượng còn',
      sorter: (a, b) => a.stock - b.stock,
    },

    {
      dataIndex: 'price',
      title: 'Giá',
      render: (amount) => formatPrice(amount),
      sorter: (a, b) => a.price - b.price,
    },

    {
      dataIndex: 'key',
      title: 'Hoạt động',
      render: (id) => {
        return (
          <Fragment>
            <Link to={`/admin/product/${id}`}>
              <EditOutlined />
            </Link>

            <Button type="text" onClick={() => deleteProductHandler(id)}>
              <DeleteOutlined style={{ color: 'red' }} />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        key: item._id,
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
      });
    });
  return (
    <Layout breadcrumb={['Sản phẩm']}>
      <Spin spinning={loading}>
        <Table columns={columns} dataSource={rows} />
      </Spin>
    </Layout>
  );
};

export default Products;
