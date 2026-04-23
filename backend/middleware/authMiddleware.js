import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    // 1. Get token from header
    const token = req.headers.authorization;

    // 2. Check if token exists
    if (!token) {
      return res.status(401).json({ message: "No token, access denied" });
    }

    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Attach user info to request
    req.user = decoded;

    // 5. Move to next middleware/controller
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default auth;