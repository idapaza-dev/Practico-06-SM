require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

connectDB(process.env.MONGO_URI);

app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));
app.use('/patients', require('./routes/patients'));
app.use('/appointments', require('./routes/appointments'));
app.use('/medicos', require('./routes/medicos'));

app.get('/', (req, res) => res.send('API CMU funcionando'));
app.get('/1', (req, res) => res.sendFile(__dirname + '/pagina.html'));
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
