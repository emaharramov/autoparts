const express = require('express');
const router = express.Router();
const { auth, isAdmin } = require('../middleware/auth.middleware');
const {
    getAllManufacturers,
    getManufacturerById,
    createManufacturer,
    updateManufacturer,
    deleteManufacturer,
    getManufacturerProducts
} = require('../controllers/manufacturer.controller');
const {
    createManufacturerValidation,
    updateManufacturerValidation,
    manufacturerIdValidation
} = require('../middleware/validation/manufacturer.validation');

// Public routes
router.get('/', getAllManufacturers);
router.get('/:id', manufacturerIdValidation, getManufacturerById);
router.get('/:id/products', manufacturerIdValidation, getManufacturerProducts);

// Protected routes (admin only)
router.post('/', auth, isAdmin, createManufacturerValidation, createManufacturer);
router.put('/:id', auth, isAdmin, updateManufacturerValidation, updateManufacturer);
router.delete('/:id', auth, isAdmin, manufacturerIdValidation, deleteManufacturer);

module.exports = router;
