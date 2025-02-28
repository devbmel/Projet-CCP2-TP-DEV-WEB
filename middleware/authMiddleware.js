import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET;

export function authenticateToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Access denied" });

  jwt.verify(token, SECRET_KEY, (error, user) => {
    console.error(error);
    if (error) return res.satus(403).json({ message: "Token not valid!" });
    req.user = user;
    next();
  });
}

export function checkRoles(requiredRole) {
  return (req, res, next) => {
    console.log(req.user);
    if (!req.user) {
      return res.status(401).json({
        message: "You must be authenticated to access this resource.",
      });
    }
    if (req.user.role !== requiredRole) {
      return res.status(403).json({ message: `Access denied.` });
    }
    next();
  };
}
