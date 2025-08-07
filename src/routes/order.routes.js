const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");

router.post("/create", orderController.create);
router.get('/all', orderController.getAll);
router.get('/detail/u=:id', orderController.getById);
router.post('/update/u=:id', orderController.update);
router.delete('/delete/u=:id', orderController.deleteById)

module.exports = router