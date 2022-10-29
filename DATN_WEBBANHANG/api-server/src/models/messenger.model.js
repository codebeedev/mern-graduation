const mongoose = require("mongoose");
const { Schema } = mongoose;

const MessengerSchema = new Schema({
    user_id1: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "users",
    },
    user_id2: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "users",
    },
    content: Array

}, {
    collection: 'messenger',
    timestamps: true,
})

module.exports = mongoose.model("messenger", MessengerSchema);
