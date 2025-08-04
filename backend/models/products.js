// backend/models/products.js
const db = require('../config/db');

const createProductsTable = `CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    productsname VARCHAR(255) NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`;

async function initProductsTable() {
  try {
    await db.query(createProductsTable); // ✅ 콜백 없이 await 사용
    console.log('✅ 상품 테이블 생성 완료');
  } catch (err) {
    console.error('❌ 상품 테이블 생성 실패:', err);
  }
}

module.exports = { initProductsTable };
