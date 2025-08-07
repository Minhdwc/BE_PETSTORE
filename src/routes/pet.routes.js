const express = require("express");
const router = express.Router();
const petController = require("../controllers/pet.controller");

router.post("/create", petController.create);
router.get('/all', petController.getAll);
router.get('/detail/u=:id', petController.getById);
router.post('/update/u=:id', petController.update);
router.delete('/delete/u=:id', petController.deleteById)

module.exports = router