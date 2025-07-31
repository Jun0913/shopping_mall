const express = require('express');
const router = express.Router();

// 예시용 라우터
router.get('/status', (req, res) => {
  res.json({ message: '관리자 API 정상 작동 중' });
});

module.exports = router;
