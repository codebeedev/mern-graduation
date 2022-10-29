import { FileAddOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Spin, Table } from 'antd';
import React, { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { formatPrice } from '../../../../utils/products';

const PopupProduct = ({ products, addProduct, loading, loadingDetail }) => {
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
          <Button type="text" onClick={() => addProduct(id)}>
            <FileAddOutlined style={{ color: 'red' }} />
          </Button>
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
    <Spin spinning={loading}>
      <Spin spinning={loadingDetail}>
        <Table columns={columns} dataSource={rows} size="small" />
      </Spin>
    </Spin>
  );
};

export default PopupProduct;
