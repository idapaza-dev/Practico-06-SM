const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true }, // 'YYYY-MM-DD'
  time: { type: String, required: true }, // 'HH:mm'
  reason: String,
  status: { type: String, enum: ['PROGRAMADO','ATENDIDO','CANCELADO','AUSENTE'], default: 'PROGRAMADO' }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
