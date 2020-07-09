const mongoose = require("mongoose")
const mongooseLeanVirtuals = require("mongoose-lean-virtuals")
const moment = require("moment");

const Schema = mongoose.Schema

const MessageSchema = new Schema({
    title: { type: String, required: true },
    timestamp: { type: String, default: moment().format('MMMM Do YYYY'), required: true },
    text: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
})

MessageSchema.virtual("url").get(function () {
    return "/messages/" + this._id + "/delete"
})

MessageSchema.plugin(mongooseLeanVirtuals)
module.exports = mongoose.model("Message", MessageSchema)
