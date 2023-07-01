const mongoose = require('mongoose');

const wireframeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile', required: true },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  name: { type: String, required: true },
  description: { type: String },
  file: {
    data: Buffer, // Stores the file data
    contentType: String, // Stores the MIME type of the file
  },
  // Additional fields for wireframe properties and elements
});

module.exports = mongoose.model('Wireframe', wireframeSchema);
