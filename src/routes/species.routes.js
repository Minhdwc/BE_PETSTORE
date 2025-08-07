const express = require("express");
const router = express.Router();
const speciesController = require("../controllers/species.controller");

router.post("/create", speciesController.create);
router.get('/all', speciesController.getAll);
router.get('/detail/u=:id', speciesController.getById);
router.post('/update/u=:id', speciesController.update);
router.delete('/delete/u=:id', speciesController.deleteById)

module.exports = router