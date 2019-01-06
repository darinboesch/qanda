const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  domain: String,
  favorited: {
    type: Boolean,
    default: false
  },
  source: {
    type: String,
    default: ''
  }
});

const Url = module.exports = mongoose.model('Url', urlSchema);
