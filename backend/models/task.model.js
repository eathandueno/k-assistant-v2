const mongoose = require('mongoose');
const Schema = mongoose.Schema
const taskSchema = new Schema({
  username: { type: Schema.Types.ObjectId, ref: 'UserProfile', required: true },
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  completed: { type: Boolean, default: false },
  priority: { type: String },
  // Additional fields for task properties and status
});

module.exports = mongoose.model('Task', taskSchema);
