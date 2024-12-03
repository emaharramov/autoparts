const express = require('express')
const router = express.Router()
const {getAllProducts, deleteProduct, getProductById} = require('../controllers/product')

router.get('/all', getAllProducts)
router.get('/:id', getProductById)
router.delete('/:id', deleteProduct)

module.exports = router