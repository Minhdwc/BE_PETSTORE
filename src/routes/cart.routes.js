const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");
const middleware = require("../middleware/auth.middleware");

router.post("/create", middleware.isAuthen, cartController.create);
router.get('/all', middleware.isAuthen, cartController.getAll);
router.get('/detail/u=:id', middleware.isAuthen, cartController.getByID);
router.post('/update/u=:id', middleware.isAuthen, cartController.update);
router.delete('/delete/u=:id', middleware.isAuthen, cartController.deleteById);

module.exports = router