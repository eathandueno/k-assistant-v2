const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const HabitSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    habitName: { type: String, required: true },
    goal: { type: String, required: true },
    progress: { type: Number, default: 0 },
});
module.exports = mongoose.model('Habits', HabitSchema);