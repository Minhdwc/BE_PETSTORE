const express = require("express");
const router = express.Router();
const productionController = require("../controllers/production.controller");

router.post("/create", productionController.create);
router.get('/all', productionController.getAll);
router.get('/detail/u=:id', productionController.getById);
router.post('/update/u=:id', productionController.update);
router.delete('/delete/u=:id', productionController.deleteById)

module.exports = router