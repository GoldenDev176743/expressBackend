const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName:{
    type: String,
  //  required: true
  },
  lastName:{
    type: String,
  //  required: true
  },
  age:{
    type: String,
  //  required: true
  },
  email:{
    type: String,
  //  required: true
  },
  visits:{
    type: String,
  //  required: true
  },
  status:{
    type: String,
  //  required: true
  },
  progress:{
    type: Number,
  //  required: true
  }
});

module.exports = mongoose.model('User', UserSchema);
