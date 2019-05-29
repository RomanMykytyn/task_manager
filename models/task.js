var mongoose = require('mongoose')
var Schema = mongoose.Schema

const taskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  forUsers: {
    type: Array,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})


const Task = mongoose.model('task', taskSchema)
module.exports = Task
