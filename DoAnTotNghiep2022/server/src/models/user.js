const { Schema, model } = require("mongoose")

const UserSchema = new Schema({
    id: {type: String, unique: true, index: true},
    bc_address: {type: String, unique: true},
})

module.exports = {UserEntity : model("User", UserSchema)}