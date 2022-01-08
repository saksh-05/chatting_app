const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  photo: String,
  name: String,
  phone: Number | String,
  bio: String,
  password: String,
});

const eventData = mongoose.model("userinfo", UserSchema);

module.exports = eventData;
