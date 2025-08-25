const express = require("express");
const router = express.Router();
const favouriteController = require("../controllers/favourite.controller");

router.post("/create", favouriteController.create);
router.get('/all', favouriteController.getAll);
router.get('/detail/u=:id', favouriteController.getById);
router.post('/update/u=:id', favouriteController.update);
router.delete('/delete/u=:id', favouriteController.deleteById)

module.exports = router