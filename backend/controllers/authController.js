const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  // body: { id, password }로 받되, 기존 username도 허용
  const { id, username, password } = req.body;
  const loginId = id ?? username;

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [loginId]);
    if (rows.length === 0) {
      return res.status(401).json({ error: '존재하지 않는 아이디입니다.' });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: '비밀번호가 일치하지 않습니다.' });
    }

    const secret = process.env.JWT_SECRET;
    const token = jwt.sign(
      {
        uid: user.list,   // PK (숫자, 예: 1,2,3…)
        id: user.id,      // 로그인 아이디(문자열)
        role: user.role,
      },
      secret,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: '로그인 성공',
      token,
      user: {
        uid: user.list,
        id: user.id,
        email: user.email,
        role: user.role,
        created_at: user.created_at,
        updated_at: user.updated_at,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '서버 오류', details: err.message });
  }
};

const register = async (req, res) => {
  try {
    // body: { email, password, id } (id = 로그인 아이디)
    const { email, password, id } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      'INSERT INTO users (email, password, id, role) VALUES (?, ?, ?, ?)',
      [email, hashedPassword, id, 'user']
    );

    return res.status(201).json({ message: '회원가입 성공' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '회원가입 중 오류 발생', details: error.message });
  }
};

const logout = async (_req, res) => {
  return res.status(200).json({ message: '로그아웃 처리 완료 (서버에서 별도 작업 없음)' });
};

module.exports = { login, register, logout };
