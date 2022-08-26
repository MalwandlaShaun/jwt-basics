const { UnAuthorizedError } = require("../errors");

const authMiddleware = async (req, res, next) => {
  const authHeaders = req.headers.authorization;

  if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
    throw UnAuthorizedError("No token");
  }

  const token = authHeaders.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decoded;
    req.user = { id, username };

    next();
  } catch (error) {
    throw UnAuthorizedError("No token");
  }
};

module.exports = authMiddleware;
