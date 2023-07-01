const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserProfileSchema = new Schema({
    
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    preferences: { type: Schema.Types.Mixed },
    healthConditions: [{ type: String }],
});

module.exports = mongoose.model('UserProfile', UserProfileSchema);
