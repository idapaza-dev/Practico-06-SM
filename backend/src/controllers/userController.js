const User = require('../models/User');

exports.createUser = async (req, res) => {
  const { name, username, password, role } = req.body;
  try {
    const exists = await User.findOne({ username });
    if (exists) return res.status(400).json({ msg: 'Usuario ya existe' });
    const user = new User({ name, username, password, role });
    await user.save();
    res.status(201).json({ id: user._id, name: user.name, username: user.username, role: user.role });
  } catch (err) {
    res.status(500).json({ msg: 'Error creando usuario' });
  }
};

exports.getUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};
