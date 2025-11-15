const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  ci: { type: String, required: true, unique: true },
  birthDate: Date,
  phone: String
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);
