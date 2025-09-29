const express = require("express");
const router = express.Router();
const favouriteController = require("../controllers/favourite.controller");
const middleware = require('../middleware/auth.middleware')

router.post("/create", middleware.isAuthen, favouriteController.create);
router.get('/all', middleware.isAuthen, favouriteController.getAll);
router.get('/detail/:id', favouriteController.getById);
router.put('/update', middleware.isAuthen, favouriteController.update);
router.delete('/delete/:id', favouriteController.deleteById)

module.exports = router