// backend/init/initUsersDB.js
require('../config/db'); // DB 연결 실행됨

const { initUsersTable } = require('../models/users');

(async () => {
  await initUsersTable(); // ✅ async 함수니까 await 사용
})();