import jwt from "jsonwebtoken";

import config from "../config/config.js";

const checkAuth = (req, res, next) => {
  console.log("------------Call checkAuth------------");
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
  if (token) {
    try {
      // verify if token fit sercet key
      const decodedToken = jwt.verify(token, config.jwt.secret);

      // save variable id in global variable
      req.userid = decodedToken.id;

      // call next funciton
      next();
    } catch (err) {
      res.status(403).json({ message: "Have no access" });
    }
  } else {
    res.status(403).json({ message: "Have no access" });
  }
};

export default checkAuth;
