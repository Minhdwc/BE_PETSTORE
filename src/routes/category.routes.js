const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");

router.post("/create", categoryController.create);
// router.post('/create/many', categoryController.createMany)
router.get('/all', categoryController.getAll);
router.get('/detail/u=:id', categoryController.getById);
router.post('/update/u=:id', categoryController.update);
router.delete('/delete/u=:id', categoryController.deleteById)

module.exports = router