const auth = require("basic-auth");

module.exports = function(req, res, next) {
  const credentials = auth(req);
    
  if (!credentials
    || credentials.name !== process.env.AUTH_NAME
    || credentials.pass !== process.env.AUTH_PASS
  ) {
    res.statusCode = 401;
    res.setHeader("WWW-Authenticate", "Basic realm=\"example\"");
    res.end("Access denied");
  } else {
    next();
  }
};
