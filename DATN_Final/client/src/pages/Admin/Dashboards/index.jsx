import { useEffect } from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllOrders } from '../../../redux/actions/orderAction';
import { getAdminProduct } from '../../../redux/actions/productAction';
import { getAllUsers } from '../../../redux/actions/userAction';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import './styles.scss';
import Layout from '../Layout';
import { formatPrice } from '../../../utils/products';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboards = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders
      .filter((val) => val.orderStatus !== 'Processing')
      .forEach((item) => {
        totalAmount += item.totalPrice;
      });

  const lineState = {
    labels: ['Số tiền ban đầu', 'Số tiền kiếm được'],
    datasets: [
      {
        label: `Tổng cộng ${formatPrice(totalAmount)}`,
        backgroundColor: ['tomato'],
        hoverBackgroundColor: ['rgb(197, 72, 49)'],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ['Hết hàng', 'Trong kho'],
    datasets: [
      {
        backgroundColor: ['#00A6B4', '#6800B4'],
        hoverBackgroundColor: ['#4B5000', '#35014F'],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  return (
    <Layout breadcrumb={['Trang chủ']}>
      <div className="dashboard">
        <div className="row">
          <div className="col-md-4">
            <div className="dashboard-item">
              <Link to="/admin/products">
                <h4>Sản phẩm</h4>
                <p>{products && products.length}</p>
              </Link>
            </div>
          </div>
          <div className="col-md-4">
            <div className="dashboard-item">
              <Link to="/admin/products">
                <h4>Đơn hàng</h4>
                <p>{orders && orders.length}</p>
              </Link>
            </div>
          </div>
          <div className="col-md-4">
            <div className="dashboard-item">
              <Link to="/admin/users">
                <h4>Users</h4>
                <p>{users && users.length}</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-5 dashboard-line">
          <Line data={lineState} />
        </div>

        <div className="mt-5 dashboard-doughnut">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboards;
