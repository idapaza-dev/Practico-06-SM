const mongoose = require('mongoose');

async function connectDB(uri) {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB conectado');
  } catch (err) {
    console.error('Error conectando a MongoDB', err);
    process.exit(1);
  }
}

module.exports = connectDB;
