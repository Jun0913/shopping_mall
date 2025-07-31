import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // 📌 추가
import axios from 'axios'; // 📌 추가

const RegisterPage = () => {
  const navigate = useNavigate(); // 📌 추가

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    //confirmPassword: '' 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await axios.post('/api/auth/register', {
        username: form.username,
        email: form.email,
        password: form.password,
      }); // 📌 백엔드로 실제 요청 전송

      console.log('✅ 회원가입 성공:', response.data);
      alert('회원가입이 완료되었습니다.');
      navigate('/login'); // 📌 성공 시 로그인 페이지로 이동
    } catch (err) {
      console.error('❌ 회원가입 실패:', err.response?.data || err.message);
      alert('회원가입 실패: ' + (err.response?.data?.error || '서버 오류'));
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-900 to-neutral-700 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md sm:max-w-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">회원가입</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="text-sm text-black-900 block mb-1">아이디</label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="아이디 입력"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full border-b border-gray-300 focus:outline-none py-2 px-1 bg-transparent"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="text-sm text-black-900 block mb-1">이메일</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="이메일 입력"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border-b border-gray-300 focus:outline-none py-2 px-1 bg-transparent"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="text-sm text-black-900 block mb-1">비밀번호</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호 입력"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border-b border-gray-300 focus:outline-none py-2 px-1 bg-transparent"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="text-sm text-black-900 block mb-1">비밀번호 확인</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="비밀번호 확인"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full border-b border-gray-300 focus:outline-none py-2 px-1 bg-transparent"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-full text-base font-semibold transition"
          >
            회원가입
          </button>

          <div className="text-center mt-5 text-sm text-gray-500 space-x-2">
            <Link to="/login" className="hover:underline">로그인</Link>
            <span>|</span>
            <Link to="/find-password" className="hover:underline">비밀번호 찾기</Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RegisterPage;
