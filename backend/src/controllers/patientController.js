const Patient = require('../models/Patient');

exports.createPatient = async (req, res) => {
  const { fullName, ci, birthDate, phone } = req.body;
  try {
    const exists = await Patient.findOne({ ci });
    if (exists) return res.status(400).json({ msg: 'CI ya registrado' });
    const p = new Patient({ fullName, ci, birthDate, phone });
    await p.save();
    res.status(201).json(p);
  } catch (err) {
    res.status(500).json({ msg: 'Error creando paciente' });
  }
};

exports.listPatients = async (req, res) => {
  const patients = await Patient.find().sort({ fullName: 1 });
  res.json(patients);
};
