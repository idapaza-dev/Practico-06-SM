const Appointment = require('../models/Appointment');

exports.createAppointment = async (req, res) => {
  const { patient, doctor, date, time, reason } = req.body;
  try {
    const ap = new Appointment({ patient, doctor, date, time, reason, status: 'PROGRAMADO' });
    await ap.save();
    res.status(201).json(ap);
  } catch (err) {
    res.status(500).json({ msg: 'Error creando turno' });
  }
};

exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const ap = await Appointment.findById(id);
    if (!ap) return res.status(404).json({ msg: 'Turno no encontrado' });
    ap.status = status;
    await ap.save();
    res.json(ap);
  } catch (err) {
    res.status(500).json({ msg: 'Error actualizando turno' });
  }
};

exports.listAppointments = async (req, res) => {
  const filters = {};
  if (req.query.doctor) filters.doctor = req.query.doctor;
  if (req.query.status) filters.status = req.query.status;
  if (req.query.date) filters.date = req.query.date;
  const list = await Appointment.find(filters).populate('patient').populate('doctor', '-password');
  res.json(list);
};
