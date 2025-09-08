const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notification.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/create", notificationController.create);
router.get('/all', authMiddleware.isAuthen, notificationController.getAll);
router.get('/detail/u=:id', authMiddleware.isAuthen, notificationController.getById);
router.post('/update/u=:id', authMiddleware.isAuthen, notificationController.update);
router.delete('/delete/u=:id', authMiddleware.isAuthen, notificationController.deleteById)

module.exports = router