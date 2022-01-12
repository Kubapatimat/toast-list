const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ToastSchema = new Schema({
  ingredients: [
    {
      type: String,
      required: true,
    },
  ],
  toastTime: {
    type: Number,
    required: true,
    min: [1, "Time must be positive"],
  },
  comment: {
    type: String,
    required: false,
  },
});

const Toast = mongoose.model("Toast", ToastSchema);

module.exports = Toast;
