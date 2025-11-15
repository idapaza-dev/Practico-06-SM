const express = require('express');
const router = express.Router();
const { createUser, getUsers } = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/roleMiddleware');

router.use(auth, isAdmin);
router.post('/', createUser);
router.get('/', getUsers);


// // // Listar solo doctores (acceso recepcionista)
// router.get("/doctors", isRecepcionista, async (req, res) => {
//   try {
//     const doctors = await User.find({ role: "medico" }).select("-password");
//     res.json(doctors);
//   } catch (error) {
//     res.status(500).json({ message: "Error al obtener médicos" });
//   }
// });

module.exports = router;
