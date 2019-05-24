<<<<<<< HEAD
var mongoose = require('mongoose');

module.exports = mongoose.model('User',{
    username: {
      type: String,
      unique: true,
      required: true
  },
    password: {
      type: String,
      required: true
  },
});
=======
var mongoose = require('mongoose')
var Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
})


const User = mongoose.model('user', userSchema)
module.exports = User
>>>>>>> fcedf91b7ecbcf1099a54f0b99f6da772a133ba9
