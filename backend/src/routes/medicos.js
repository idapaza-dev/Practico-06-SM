const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Obtener solo médicos
router.get('/', async (req, res) => {
  try {
    const docs = await User.find({ role: 'medico' });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ msg: 'Error al obtener médicos' });
  }
});

module.exports = router;
