module.exports = (requiredRoles) => (req, res, next) => {
    if (!requiredRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'You do not have permission to perform this action.' });
    }
    next();
  };
  