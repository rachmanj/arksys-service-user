const bcrypt = require("bcrypt");
const { User } = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
  const schema = {
    name: "string|empty:false",
    username: "string|empty:false",
    email: "email|empty:false",
    role: "string|optional",
    password: "string|min:6",
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  const user = await User.findOne({
    where: { email: req.body.email },
  });

  if (user) {
    return res.status(409).json({
      status: "error",
      message: "Email already exist",
    });
  }

  const username = await User.findOne({
    where: { email: req.body.username },
  });

  if (username) {
    return res.status(409).json({
      status: "error",
      message: "Username already exist",
    });
  }

  const password = await bcrypt.hash(req.body.password, 10);

  const data = {
    password,
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    role: "user",
  };

  const createdUser = await User.create(data);

  return res.json({
    status: "success",
    data: {
      id: createdUser.id,
      name: createdUser.name,
      username: createdUser.username,
      email: createdUser.email,
    },
  });
};
