require('dotenv').config();
const connectDB = require('./config/db');
const User = require('./models/User');

const seed = async () => {
  await connectDB(process.env.MONGO_URI);
  const users = [
    { name: 'Admin CMU', username: 'admin', password: 'admin123', role: 'admin' },
    { name: 'Recep Uno', username: 'recep', password: 'recep123', role: 'recepcionista' },
    { name: 'Dr. Pérez', username: 'drperez', password: 'med123', role: 'medico' }
  ];
  for (const u of users) {
    const exists = await User.findOne({ username: u.username });
    if (!exists) {
      const user = new User(u);
      await user.save();
      console.log('Creado', u.username);
    } else {
      console.log('Ya existe', u.username);
    }
  }
  process.exit();
};

seed();
