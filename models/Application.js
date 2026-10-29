const mongoose = require('mongoose');
const schema = new mongoose.Schema({ studentName: { type: String, required: true }, email: { type: String, required: true }, rollNumber: { type: String, required: true }, internshipId: { type: String, required: true }, internshipTitle: { type: String, required: true } }, { timestamps: true });
module.exports = mongoose.models.Application || mongoose.model('Application', schema);
