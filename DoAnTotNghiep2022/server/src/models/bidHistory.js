const { Schema, model } = require("mongoose")

const BidHistorySchema = new Schema({
    id: {type: String, unique: true, index: true},
    nft_id: {type: String, required: true}, //
    market_nft_id: {type: String, required: true}, // 

    bid_signature: {type: String, required: true},  //
    bidder: {type: String, required: true}, //
    bid_time:  {type: Number, required: true}, //
    bid_price:  {type: String, required: true}, //
})

module.exports = {BidHistoryEntity : model("BidHistory", BidHistorySchema)}