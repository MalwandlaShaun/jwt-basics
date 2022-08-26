const CustomAPIError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");
const login = (req, res) => {
  const { username, secret } = req.body;

  if (!username || !secret) {
    throw new CustomAPIError("Please provide name and password", 400);
  }
  console.log(username, secret);
  const id = new Date().getDate();

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(200).json({ msg: "username created", token });
};

const dashboard = (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `welcome to the dashboard, your lucky number is ${luckyNumber}...`,
  });
  console.log(req.user)
};

module.exports = { login, dashboard };
