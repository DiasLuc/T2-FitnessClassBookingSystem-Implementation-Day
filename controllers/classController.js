const classService = require('../service/classService');

exports.listClasses = (req, res) => {
  res.json(classService.listClasses());
};

exports.getClassDetails = (req, res) => {
  const cls = classService.getClassDetails(req.params.id);
  if (!cls) return res.status(404).json({ error: 'Class not found or inactive' });
  res.json(cls);
};

exports.createClass = (req, res) => {
  const result = classService.createClass(req.body);
  if (result.error) return res.status(400).json({ error: result.error });
  res.json(result);
};

exports.removeClass = (req, res) => {
  const result = classService.removeClass(req.params.id);
  if (result.error) return res.status(404).json({ error: result.error });
  res.json(result);
};
