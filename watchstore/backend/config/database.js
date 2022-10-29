const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;

const connectDatabase = () => {
    mongoose
        .connect(
            "mongodb+srv://vankha19:TSsfGvXM9T9Z63eo@cluster0.plxsq.mongodb.net/?retryWrites=true&w=majority",
            { useNewUrlParser: true, useUnifiedTopology: true }
        )
        .then((con) => {
            console.log("Mongoose Connected");
            // console.log(con.connections);
        });
};

module.exports = connectDatabase;
