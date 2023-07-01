const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PrototypeSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    projectName: { type: String, required: true },
    files: [{ type: Schema.Types.ObjectId, ref: 'File' }],
});

const FileSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    projectId: { type: Schema.Types.ObjectId, ref: 'Prototype', required: true },
    fileName: { type: String, required: true },
    fileType: { type: String, required: true },
    fileData: { type: Buffer, required: true },
});
module.exports = mongoose.model('Files', FileSchema);
module.exports = mongoose.model('Prototype', PrototypeSchema);