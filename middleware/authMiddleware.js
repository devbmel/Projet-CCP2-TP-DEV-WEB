import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Access denied" });

  jwt.verify(token, SECRET_KEY, (error, user) => {
    console.error(error);
    if (error) return res.satus(403).json({ message: "Token not valid!" });
    req.user = user;
    next();
  });
}

export default authenticateToken;
