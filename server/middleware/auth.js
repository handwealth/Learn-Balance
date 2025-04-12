// server/middleware/auth.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authMiddleware = (req, res, next) => {
  // Retrieve token from Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // If no token is provided, return an error
  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  try {
    // Verify the token using the JWT_SECRET from the .env file
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the verified user info to the request object
    req.user = verified;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // If token verification fails, return a 403 Forbidden error
    console.error('Token verification failed:', err.message); // Log error for debugging
    res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

export default authMiddleware;
