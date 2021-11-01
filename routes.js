const express = require("express");
const router = express.Router();
const userController = require("./src/controllers/usersController");
router.get("/", (req, res) => {
  res.json({ message: "REST Back-end Challenge 20201209 Running" });
});
router.get("/users", userController.listUsers);
router.post("/users", userController.createUser);
router.get("/users/:id", userController.listUserById);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);
module.exports = router;
