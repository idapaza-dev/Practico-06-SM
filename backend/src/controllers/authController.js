const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ msg: 'Faltan credenciales' });
  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ msg: 'Credenciales inválidas' });
  const match = await user.matchPassword(password);
  if (!match) return res.status(401).json({ msg: 'Credenciales inválidas' });
  res.json({
    token: generateToken(user),
    user: { id: user._id, name: user.name, role: user.role, username: user.username }
  });
};
