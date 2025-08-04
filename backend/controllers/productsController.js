// backend/controllers/productsController.js
const db = require('../config/db');

// 전체 상품 목록 조회
exports.getAllProducts = async (req, res) => {
  try {
    const [rows] = await db.promise().query('SELECT * FROM products');
    res.status(200).json(rows);
  } catch (error) {
    console.error('상품 목록 조회 실패:', error);
    res.status(500).json({ message: '서버 에러' });
  }
};

// 상품 상세 조회
exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.promise().query('SELECT * FROM products WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('상품 상세 조회 실패:', error);
    res.status(500).json({ message: '서버 에러' });
  }
};
