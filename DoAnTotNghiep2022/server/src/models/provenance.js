const { Schema, model } = require("mongoose")

const ProvenanceSchema = new Schema({
    id: {type: String, unique: true, index: true},
    nft_id: {type: String},
    type: {type: String},
    
    minter: {type: String},

    seller: {type: String},
    buy_price: {type: String},

    buyer: {type: String},

    from_address: {type: String},
    to_address: {type: String},

    revoker: {type: String},

    tx_hash: {type: String},
    time: {type: Number, default: Date.now()}
})

module.exports = {ProvananceEntity : model("Provenance", ProvenanceSchema)}