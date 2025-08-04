// backend/app.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const productsRouter = require('./routes/users/products');

// .env 파일 로드
dotenv.config({ path: path.resolve(__dirname, '../.env') });
const app = express();  
const PORT = process.env.PORT || 8080;


// ✅ DB 테이블 초기화 (한 번만 실행됨)
require('./init/initProductsDB');

// 미들웨어
app.use(cors());
app.use(express.json());
app.use('/api/products', productsRouter);

// 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 서버 실행 중: http://localhost:${PORT}`);
});
