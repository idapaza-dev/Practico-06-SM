const express = require('express');
const router = express.Router();
const { createPatient, listPatients } = require('../controllers/patientController');
const auth = require('../middlewares/authMiddleware');
const { isRecepcionista } = require('../middlewares/roleMiddleware');

router.post('/', auth, isRecepcionista, createPatient);
router.get('/', auth, listPatients);

module.exports = router;
