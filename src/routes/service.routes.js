const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/service.controller");
const authMiddleware = require("../middleware/auth.middleware");

// Public routes (no authentication required)
router.get('/all', serviceController.getAll);
router.get('/active', serviceController.getActiveServices);
router.get('/search', serviceController.search);
router.get('/category/:category', serviceController.getByCategory);
router.get('/detail/:id', serviceController.getById);

// Protected routes (authentication required)
router.post('/create', authMiddleware, serviceController.create);
router.put('/update/:id', authMiddleware, serviceController.update);
router.delete('/delete/:id', authMiddleware, serviceController.deleteById);
router.patch('/toggle-active/:id', authMiddleware, serviceController.toggleActive);

module.exports = router;
