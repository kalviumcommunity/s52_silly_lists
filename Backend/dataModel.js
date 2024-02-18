const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: Array,
    required: true,
  },
  creater:{
    type:String,
    requires:true
  }
},{timestamps:true});


module.exports = mongoose.model('content',dataSchema,'content')