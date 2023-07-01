const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ReminderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    reminderType: { type: String, required: true },
    reminderMessage: { type: String, required: true },
    reminderTime: { type: Date, required: true },
});
module.exports = mongoose.model('Reminder', ReminderSchema);