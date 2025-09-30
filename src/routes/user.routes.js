const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const middleware = require("../middleware/auth.middleware");

router.post("/create", userController.create);
router.get('/all', userController.getAll);
router.get('/detail/me', middleware.isAuthen, userController.getMyDetail);
router.get('/detail/u=:id', userController.getById);
router.post('/update/u=:id', userController.update);
router.delete('/delete/u=:id', userController.deleteById);

module.exports = router