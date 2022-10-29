const express = require("express")
const app = express()
const PORT = process.env.PORT || 9901
require("dotenv").config()
const http = require('http')
const connect = require("mongoose").connect

const server = http.createServer(app)

connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
})
.then(() => {
    console.log("MongoDB Connected ...");
})
.catch((err) => console.log(err));


const cors = require("cors")

app.use(cors())
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: false }));

const info_router = require("./src/router/info")
const user_router = require("./src/router/user")
const nft_router = require("./src/router/nft")
const market_nft_router = require("./src/router/marketNFT")
const bid_history_router = require("./src/router/bidHistory")

app.use("/api/info", info_router)
app.use("/api/user", user_router)
app.use("/api/nft", nft_router)
app.use("/api/market-nft", market_nft_router)
app.use("/api/bid", bid_history_router)

server.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
})