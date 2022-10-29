const productRouter = require('./product.router');
const categoryRouter = require('./category.router');
const brandRouter = require('./brand.router');
const commentRouter = require('./comment.router');
const ratingRouter = require('./rating.router');
const cartRouter = require('./cart.router');
const orderRouter = require('./order.router');
const orderItemRouter = require('./order_item.router');
const userRouter = require('./user.router');
const configRouter = require('./config.router');
const SignControllers = require('../controllers/sign/index');
const notificationRouter = require('./notification.router');
const productImageRouter = require('./product_image.router');
const auth = require('../middlewares/auth');
const { ADMIN } = require('../configs/constants');
const StatisticControllers = require('../controllers/statistic/index');
const addressRouter = require('./address.router');
const saleRouter = require('./sale.router');
const mailerRouter = require('./mailer.route');
const favoriteProductRouter = require('./favorite_product.router');
const checkoutMomoRouter = require('./checkout_momo.router')
const messengerRouter = require('./messenger.router')


const ENDPOINT = process.env.API_ENDPOINT || '/api/v1';

const routes = (app) => {
  app.use(`${ENDPOINT}/sales`, saleRouter);
  app.use(`${ENDPOINT}/addresses`, addressRouter);
  app.use(`${ENDPOINT}/notifications`, notificationRouter);
  app.use(`${ENDPOINT}/order-items`, orderItemRouter);
  app.use(`${ENDPOINT}/orders`, orderRouter);
  app.use(`${ENDPOINT}/cart-items`, cartRouter);
  app.use(`${ENDPOINT}/ratings`, ratingRouter);
  app.use(`${ENDPOINT}/comments`, commentRouter);
  app.use(`${ENDPOINT}/products`, productRouter);
  app.use(`${ENDPOINT}/categories`, categoryRouter);
  app.use(`${ENDPOINT}/brands`, brandRouter);
  app.use(`${ENDPOINT}/users`, userRouter);
  app.use(`${ENDPOINT}/configs`, configRouter);
  app.use(`${ENDPOINT}/product-images`, productImageRouter);

  app.use(`${ENDPOINT}/send-email`, mailerRouter);

  app.use(`${ENDPOINT}/favorite-list`, favoriteProductRouter);

  app.use(`${ENDPOINT}/checkout-momo`, checkoutMomoRouter);

  app.use(`${ENDPOINT}/messenger`, messengerRouter);







  app.post(`${ENDPOINT}/sign-in`, SignControllers.login);
  app.use(
    `${ENDPOINT}/statistic`,
    auth(ADMIN),
    StatisticControllers.getStatistic
  );
  app.get(`${ENDPOINT}/verify/:access_token`, SignControllers.verify);
};

module.exports = routes;
