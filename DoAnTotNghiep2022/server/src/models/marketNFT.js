const { Schema, model } = require("mongoose")

const MarketNFTSchema = new Schema({
    id: {type: String, unique: true, index: true},
    nft_id: {type: String, required: true}, //
    nft_info: {type: Object, required: true}, //
    seller: {type: String, required: true}, //
    list_time: {type: Number, default: Date.now()},

    start_time: {type: Number, required: true}, //
    end_time: {type: Number, required: true}, //

    list_signature: {type: String, required: true}, 
    buy_price: {type: String, required: true}, //
    message: {type: String, required: true},

    is_bid: {type: Boolean, default: false}, //
    start_price: {type: String},
    highest_bid: {type: String},
    highest_bidder: {type: String},
    total_bids: {type: Number, default: 0},

    is_sold: {type: Boolean, default: false},
    tx_hash_buy: {type: String},
})

module.exports = {MarketNFTEntity : model("MarketNFT", MarketNFTSchema)}