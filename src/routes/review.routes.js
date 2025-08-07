const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/review.controller");

router.post("/create", reviewController.create);
router.get('/all', reviewController.getAll);
router.get('/detail/u=:id', reviewController.getById);
router.post('/update/u=:id', reviewController.update);
router.delete('/delete/u=:id', reviewController.deleteById)

module.exports = router