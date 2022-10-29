import {
  ApartmentOutlined,
  CreditCardOutlined,
  ShoppingCartOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';

const policy = [
  {
    name: 'Miễn phí giao hàng',
    description: 'Miễn phí ship với đơn hàng > 239K',
    icon: ShoppingCartOutlined,
  },
  {
    name: 'Thanh toán COD',
    description: 'Thanh toán khi nhận hàng (COD)',
    icon: CreditCardOutlined,
  },
  {
    name: 'Khách hàng VIP',
    description: 'Ưu đãi dành cho khách hàng VIP',
    icon: UserSwitchOutlined,
  },
  {
    name: 'Hỗ trợ bảo hành',
    description: 'Đổi, sửa đồ tại tất cả store',
    icon: ApartmentOutlined,
  },
];

export default policy;
