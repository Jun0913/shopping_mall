// backend/config/db.js
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') }); // env파일 읽어오기

// backend/config/db.js
const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: 10,
});

// ✅ 연결 확인 (비동기 함수 안에서 호출 필요)
async function verifyDBConnection() {
  try {
    const conn = await db.getConnection();
    console.log('✅ DB 연결 성공');
    conn.release();
  } catch (err) {
    console.error('❌ DB 연결 실패:', err);
  }
}

verifyDBConnection();

module.exports = db;

// backend/config/db.js 확인용 
console.log('🧪 DB_HOST:', process.env.DB_HOST);
console.log('🧪 DB_PORT:', process.env.DB_PORT);
