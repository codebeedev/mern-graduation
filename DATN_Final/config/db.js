const mongoose = require('mongoose');

const connectDB = () => {
	mongoose
		.connect(process.env.DB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
		.then(() => {
			console.log(`MongoDb connected !`);
		});
};

module.exports = connectDB;
