const express = require('express');
const router = express.Router();
const { createAppointment, updateStatus, listAppointments } = require('../controllers/appointmentController');
const auth = require('../middlewares/authMiddleware');

// create appointment - only recepcionista
const { isRecepcionista } = require('../middlewares/roleMiddleware');
router.post('/', auth, isRecepcionista, createAppointment);

// list appointments - any authenticated
router.get('/', auth, listAppointments);



// update status - doctors can update only their own appointment; a middleware checks ownership
router.patch('/:id/status', auth, async (req, res, next) => {
  const { id } = req.params;
  const Appointment = require('../models/Appointment');
  const ap = await Appointment.findById(id);
  if (!ap) return res.status(404).json({ msg: 'Turno no encontrado' });

  if (req.user.role === 'medico' && ap.doctor.toString() !== req.user._id.toString()) {
    return res.status(403).json({ msg: 'No puede modificar turnos de otro médico' });
  }
  next();
}, updateStatus);

module.exports = router;
