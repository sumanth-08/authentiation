const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const access_token = req.headers["Authorization"];

  if (!access_token) return res.status(401).send("Access denied! no token provided.");

  const splitToken = access_token.split(' ');

  if (splitToken.length !== 2) return res.status(401).send("Access denied! invalid token.");


  const token = splitToken[1];
  
  try {
    const decoded = jwt.verify(token, "SECRET_JWT_CODE");
    req.receive = decoded;  
    next();
    
  } catch (error) {
 
    res.status(400).send("invalid token.");
  }
};

module.exports = authenticate;

