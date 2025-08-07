const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");

router.post("/create", cartController.create);
router.get('/all', cartController.getAll);
router.get('/detail/u=:id', cartController.getByID);
router.post('/update/u=:id', cartController.update);
router.delete('/delete/u=:id', cartController.deleteById)

module.exports = router