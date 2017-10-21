module.exports = function(err, req, res, next) {
  const status = err.status ? err.status : 500;
  const message = err.message ? err.message : "Internal Server Error";

  return res.status(status).json({ error: message });
};