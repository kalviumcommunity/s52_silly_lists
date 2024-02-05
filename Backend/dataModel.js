const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  likes: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
    required: true,
  },
});


module.exports = mongoose.model('Data',dataSchema,'Data')