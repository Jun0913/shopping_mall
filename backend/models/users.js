// backend/models/users.js
const db = require('../config/db');

const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    list INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    id VARCHAR(100) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );
`;


async function initUsersTable() {
  try {
    await db.query(createUsersTable); // ✅ 콜백 없이 await 사용
    console.log('✅ 유저 테이블 생성 완료');
  } catch (err) {
    console.error('❌ 유저 테이블 생성 실패:', err);
  }
}

module.exports = { initUsersTable };
