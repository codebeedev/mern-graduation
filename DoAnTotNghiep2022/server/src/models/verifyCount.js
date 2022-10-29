const { Schema, model } = require("mongoose")

const VerifyCountSchema = new Schema({
    id: {type: String, unique: true, index: true},
    count: {type: Number, default: 0}
})

module.exports = {VerifyCountEntity : model("VerifyCount", VerifyCountSchema)}