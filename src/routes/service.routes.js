const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/service.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.get('/all', serviceController.getAll);
router.get('/active', serviceController.getActiveServices);
router.get('/search', serviceController.search);
router.get('/category/:category', serviceController.getByCategory);
router.get('/detail/:id', serviceController.getById);
router.post('/create', authMiddleware.isAuthen, serviceController.create);
router.put('/update/:id', authMiddleware.isAuthen, serviceController.update);
router.delete('/delete/:id', authMiddleware.isAuthen, serviceController.deleteById);
router.patch('/toggle-active/:id', authMiddleware.isAuthen, serviceController.toggleActive);

module.exports = router;
