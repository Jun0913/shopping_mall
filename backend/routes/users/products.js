// backend/routes/products.js
const express = require('express');
const router = express.Router();
const productsController = require('../../controllers/productsController');

// 전체 상품 목록 조회
router.get('/', productsController.getAllProducts);

// 특정 상품 상세 조회
router.get('/:id', productsController.getProductById);

module.exports = router;
