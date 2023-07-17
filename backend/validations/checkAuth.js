import jwt from "jsonwebtoken";

const checkAuth = (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
  if (token) {
    try {
      // verify if token fit sercet key
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

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
