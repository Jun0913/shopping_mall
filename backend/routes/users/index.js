const express = require('express'); // 반드시 express에서 Router 호출
const { login, register, logout } = require('../../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;
