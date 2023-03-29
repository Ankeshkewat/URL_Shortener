const mongoose = require('mongoose');

const Schema = mongoose.Schema({
  long_url:String,
  sort_url:String
})

const URLModel=mongoose.model('url',Schema);

module.exports={URLModel}