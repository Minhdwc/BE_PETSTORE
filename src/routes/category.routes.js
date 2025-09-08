const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");
const middlware = require("../middleware/auth.middleware");

router.post("/create", middlware.isAuthen, categoryController.create);
router.get('/all', middlware.isAuthen, categoryController.getAll);
router.get('/detail/u=:id', middlware.isAuthen, categoryController.getById);
router.post('/update/u=:id', middlware.isAuthen, categoryController.update);
router.delete('/delete/u=:id', middlware.isAuthen, categoryController.deleteById)

module.exports = router