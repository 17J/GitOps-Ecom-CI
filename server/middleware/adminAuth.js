
// Middleware to check if user is admin
module.exports = (req, res, next) => {
  // Check role from auth middleware
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admin role required.' });
  }
};
