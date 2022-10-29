import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, message, Spin, Table, Tag, Select, DatePicker } from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearErrors, deleteOrder, getAllOrders } from '../../../redux/actions/orderAction';
import { DELETE_ORDER_RESET } from '../../../redux/types/orderTypes';
import { formatPrice } from '../../../utils/products';
import Layout from '../Layout';
import moment from 'moment';
const { Option } = Select;

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, orders } = useSelector((state) => state.allOrders);

  const { error: deleteError, isDeleted, loading } = useSelector((state) => state.order);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  const columns = [
    { dataIndex: 'id', title: 'Mã hoá đơn' },
    { dataIndex: 'date', title: 'Ngày tạo' },

    {
      dataIndex: 'status',
      title: 'Tình trạng',
      render: (status) => {
        let color = 'processing';
        if (status === 'Delivered') {
          color = 'success';
        } else if (status === 'Processing') {
          color = 'processing';
        }

        return (
          <Tag color={color} key={status}>
            {status === 'Delivered' ? 'Đã giao hàng' : 'Chưa giao hàng'}
          </Tag>
        );
      },
      filters: [
        {
          text: 'Đã giao hàng',
          value: 'Delivered',
        },
        {
          text: 'Chưa giao hàng',
          value: 'Processing',
        },
      ],
      onFilter: (value, record) => record.status.startsWith(value),
    },
    {
      dataIndex: 'itemsQty',
      title: 'Số lượng',
      sorter: (a, b) => a.itemsQty - b.itemsQty,
    },

    {
      dataIndex: 'amount',
      title: 'Tổng tiền',
      render: (amount) => formatPrice(amount),
      sorter: (a, b) => a.amount - b.amount,
    },

    {
      dataIndex: 'key',
      title: 'Hoạt động',
      render: (id) => {
        return (
          <Fragment>
            <Link className="me-3" to={`/admin/order/${id}`}>
              <EditOutlined />
            </Link>

            <Button type="text" onClick={() => deleteOrderHandler(id)}>
              <DeleteOutlined style={{ color: 'red' }} />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        key: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
        date: moment(item.createdAt).format('MM/DD/YYYY'),
      });
    });

  const [type, setType] = useState('date');

  const [date, setDate] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const dateFormatList = ['MM/DD/YYYY', 'MM/DD/YYYY'];

  const PickerWithType = ({ type, onChange }) => {
    if (type === 'date')
      return (
        <DatePicker
          value={date && moment(date, dateFormatList[0])}
          format={dateFormatList[0]}
          onChange={onChange}
        />
      );
    return (
      <DatePicker.RangePicker
        value={
          startDate &&
          endDate && [moment(startDate, dateFormatList[0]), moment(endDate, dateFormatList[0])]
        }
        format={dateFormatList}
        onChange={onChange}
      />
    );
  };

  const handleChange = (value) => {
    setType(value);
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
      message.success('Xoá đơn thành công!');
      navigate('/admin/orders');
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders(date, startDate, endDate));
  }, [dispatch, navigate, error, deleteError, isDeleted, date, startDate, endDate]);

  const handleDateChange = (value) => {
    if (!value) {
      setDate('');
      setStartDate('');
      setEndDate('');
    } else if (Array.isArray(value)) {
      setDate('');
      setStartDate(moment(value[0]).format(dateFormatList[0]));
      setEndDate(moment(value[1]).format(dateFormatList[0]));
    } else {
      setDate(moment(value).format(dateFormatList[0]));
      setStartDate('');
      setEndDate('');
    }
  };

  return (
    <Layout breadcrumb={['Đơn đặt hàng']}>
      <div className="d-flex justify-content-center align-items-center mb-3">
        <Select value={type} onChange={handleChange} style={{ width: '150px' }}>
          <Option value="date">Date</Option>
          <Option value="dateToDate">Date - Date</Option>
        </Select>

        <PickerWithType type={type} onChange={handleDateChange} />
      </div>

      <Spin spinning={loading}>
        <Table columns={columns} dataSource={rows} />
      </Spin>
    </Layout>
  );
};

export default Orders;
