const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notification.controller");

router.post("/create", notificationController.create);
router.get('/all', notificationController.getAll);
router.get('/detail/u=:id', notificationController.getById);
router.post('/update/u=:id', notificationController.update);
router.delete('/delete/u=:id', notificationController.deleteById)

module.exports = router