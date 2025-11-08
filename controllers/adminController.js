const adminService = require('../service/adminService');

exports.register = (req, res) => {
  const result = adminService.register(req.body);
  if (result.error) return res.status(400).json({ error: result.error });
  res.json(result);
};

exports.login = (req, res) => {
  const result = adminService.login(req.body);
  if (result.error) return res.status(401).json({ error: result.error });
  res.json(result);
};
