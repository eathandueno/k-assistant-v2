const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DeviceSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    deviceType: { type: String, required: true },
    deviceId: { type: String, required: true },
    // Other device-specific fields
});
module.exports = mongoose.model('Device', DeviceSchema);