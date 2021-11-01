const User = require("../models/usersModel");
const axios = require("axios");
const api = "https://randomuser.me/api/?results=100";
exports.listUsers = async (req, res) => {
  try {
    const user = new User(req.body);
    const users = await user.searchUsers();
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
exports.listUserById = async (req, res) => {
  try {
    if (!req.params.id) return res.status(400).json({ error: "Bad request" });
    const user = new User(req.body);
    const userById = await user.searchUserBydId(req.params.id);
    return res.status(200).json(userById);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.createUser = async (req, res) => {
  try {
    axios.get(api).then(async (response) => {
      var users = response.data.results;
      for (var i = 0; i < users.length; i++) {
        var user = new User(users[i]);
        await user.register();
      }
      if (user.errors.length > 0) {
        return res.status(400).json({ error: "DB full, exclude some users" });
      }
      return res.status(201).json({ message: "Users created" });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
exports.deleteUser = async (req, res) => {
  try {
    if (!req.params.id) return res.status(400).json({ error: "Bad request" });
    const user = new User(req.body);
    const deletedUser = await user.deleteUser(req.params.id);
    return res.status(200).json(deletedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
exports.updateUser = async (req, res) => {
  try {
    if (!req.params.id) return res.status(400).json({ error: "Bad request" });
    const user = new User(req.body);
    const updatedUser = await user.updateUser(req.params.id);
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
