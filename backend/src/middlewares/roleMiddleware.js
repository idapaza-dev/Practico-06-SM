const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Requiere rol admin' });
  next();
};

const isRecepcionista = (req, res, next) => {
  if (req.user.role !== 'recepcionista') return res.status(403).json({ msg: 'Requiere rol recepcionista' });
  next();
};

const isMedico = (req, res, next) => {
  if (req.user.role !== 'medico') return res.status(403).json({ msg: 'Requiere rol medico' });
  next();
};

module.exports = { isAdmin, isRecepcionista, isMedico };
