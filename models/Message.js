const mongoose = require("mongoose")
const mongooseLeanVirtuals = require("mongoose-lean-virtuals")
const moment = require("moment")

const Schema = mongoose.Schema

const CounterSchema = Schema({
  _id: { type: Number, required: true },
  seq: { type: Number, default: 0 },
})
const counter = mongoose.model("counter", CounterSchema)

const MessageSchema = new Schema({
  title: { type: String, required: true },
  timestamp: {
    type: String,
    default: moment().format("MMMM Do YYYY"),
    required: true,
  },
  text: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  orderId: { type: Number, default: 0 },
})

MessageSchema.pre("save", function (next) {
  const doc = this
  counter
    .findByIdAndUpdate(
      { _id: this.orderId },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    )
    .then(function (count) {
      //   console.log("...count: " + JSON.stringify(count))
      doc.orderId = count.seq
      next()
    })
    .catch(function (error) {
      console.error("counter error-> : " + error)
      throw error
    })
})

MessageSchema.virtual("url").get(function () {
  return "/messages/" + this._id + "/delete"
})

MessageSchema.plugin(mongooseLeanVirtuals)
module.exports = mongoose.model("Message", MessageSchema)
