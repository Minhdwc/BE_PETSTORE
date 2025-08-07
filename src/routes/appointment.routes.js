const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointment.controller");

router.post("/create", appointmentController.create);
router.get('/all', appointmentController.getAll);
router.get('/detail/u=:id', appointmentController.getByID);
router.post('/update/u=:id', appointmentController.update);
router.delete('/delete/u=:id', appointmentController.deleteById)

module.exports = router