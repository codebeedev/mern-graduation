const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const errorMiddleware = require('./middlewares/error');

//config
if (process.env.NODE_ENV !== 'PRODUCTION') {
	require('dotenv').config({ path: 'config/config.env' });
}

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(morgan('dev'));

// Routes
const product = require('./routes/productRoute');
const user = require('./routes/userRoute');
const category = require('./routes/categoryRoute');
const order = require('./routes/orderRoute');
const payment = require('./routes/paymentRoute');
const discount = require('./routes/discountCodeRoute');

app.use('/api', product);
app.use('/api', user);
app.use('/api', category);
app.use('/api', order);
app.use('/api', payment);
app.use('/api', discount);

app.use(express.static(path.join(__dirname, './client/build')));

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, './client/build/index.html'));
});

// middleware for Error
app.use(errorMiddleware);

module.exports = app;
