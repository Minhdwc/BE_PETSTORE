const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");
const middleware = require("../middleware/auth.middleware");

router.post("/create", middleware.isAuthen, cartController.create);
router.get('/user', middleware.isAuthen, cartController.getByID);
// router.get('/detail/u=:id', middleware.isAuthen, cartController.getByID);
router.put('/update', middleware.isAuthen, cartController.update);
router.delete('/delete/u=:id', middleware.isAuthen, cartController.deleteById);

module.exports = router