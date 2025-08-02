const db = require('../config/db');  // DB 연결
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { username, password } = req.body; // 🔴 수정된 부분: email → username

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE name = ?', [username]); // 🔴 수정된 부분

    if (rows.length === 0) {
      return res.status(401).json({ error: '존재하지 않는 아이디입니다.' }); // 🔴 수정된 부분
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: '비밀번호가 일치하지 않습니다.' });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error('❌ JWT_SECRET이 .env에 설정되지 않았습니다.');
      return res.status(500).json({ error: '서버 설정 오류 (JWT 시크릿 없음)' });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, role: user.role }, // 🔴 수정된 부분: email → name
      secret,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: '로그인 성공',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '서버 오류', details: err.message });
  }
};

const register = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      'INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)',
      [email, hashedPassword, username, 'user']
    );

    return res.status(201).json({ message: '회원가입 성공' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '회원가입 중 오류 발생' });
  }
};

const logout = async (req, res) => {
  return res.status(200).json({ message: '로그아웃 처리 완료 (서버에서 별도 작업 없음)' });
};

module.exports = {
  login,
  register,
  logout,
};