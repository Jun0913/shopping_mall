// backend/init/initProductsDB.js
require('../config/db'); // DB 연결 실행됨

const { initProductsTable } = require('../models/products');

(async () => {
  await initProductsTable(); // ✅ async 함수니까 await 사용
})();