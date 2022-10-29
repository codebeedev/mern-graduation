const { Schema, model } = require("mongoose")

const NFTSchema = new Schema({
    id: {type: String, unique: true, index: true},
    name: {type: String, default: ""},
    description: {type:  String, default: ""},

    asset_uri: {type: String, required: true},
    certificate_uri: {type: String, required: true},
    json_uri: {type: String, required: true},

    creator: {type: String, required: true},
    owner: {type: String, required: true},
    tx_hash: {type: String, required: true},
    token_id: {type: Number, default: 0},

    asset_hash: {type: String, unique: true},
    certificate_hash: {type: String, unique: true},
    publish_time: {type: Number, default: Date.now()},
    is_market: {type: Boolean, default: false}
})

module.exports = {NFTEntity : model("NFT", NFTSchema)}