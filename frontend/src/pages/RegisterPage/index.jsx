import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const navigate = useNavigate();

  // 📌 useForm 훅 사용
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm({ mode: 'onChange' });

  const onSubmit = async (data) => {
    const { username, email, password } = data;

    try {
      const response = await axios.post('/api/auth/register', {
        username,
        email,
        password,
      });

      console.log('✅ 회원가입 성공:', response.data);
      alert('회원가입이 완료되었습니다.');
      navigate('/login');
      reset();
    } catch (err) {
      console.error('❌ 회원가입 실패:', err.response?.data || err.message);
      alert('회원가입 실패: ' + (err.response?.data?.error || '서버 오류'));
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-900 to-neutral-700 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md sm:max-w-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">회원가입</h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* 아이디 */}
          <div className="mb-4">
            <label htmlFor="username" className="text-sm text-black-900 block mb-1">아이디</label>
            <input
              id="username"
              type="text"
              placeholder="아이디 입력"
              className="w-full border-b border-gray-300 focus:outline-none py-2 px-1 bg-transparent"
              {...register('username', { required: '아이디는 필수입니다.' })}
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
          </div>

          {/* 이메일 */}
          <div className="mb-4">
            <label htmlFor="email" className="text-sm text-black-900 block mb-1">이메일</label>
            <input
              id="email"
              type="email"
              placeholder="이메일 입력"
              className="w-full border-b border-gray-300 focus:outline-none py-2 px-1 bg-transparent"
              {...register('email', {
                required: '이메일은 필수입니다.',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: '유효한 이메일 주소를 입력하세요.',
                },
              })}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* 비밀번호 */}
          <div className="mb-4">
            <label htmlFor="password" className="text-sm text-black-900 block mb-1">비밀번호</label>
            <input
              id="password"
              type="password"
              placeholder="비밀번호 입력"
              className="w-full border-b border-gray-300 focus:outline-none py-2 px-1 bg-transparent"
              {...register('password', {
                required: '비밀번호는 필수입니다.',
                minLength: {
                  value: 6,
                  message: '최소 6자입니다.',
                },
              })}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* 비밀번호 확인 */}
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="text-sm text-black-900 block mb-1">비밀번호 확인</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="비밀번호 확인"
              className="w-full border-b border-gray-300 focus:outline-none py-2 px-1 bg-transparent"
              {...register('confirmPassword', {
                required: '비밀번호 확인은 필수입니다.',
                validate: (value) =>
                  value === watch('password') || '비밀번호가 일치하지 않습니다.',
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* 제출 버튼 */}
          <button
            type="submit"
            className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-full text-base font-semibold transition"
          >
            회원가입
          </button>

          {/* 하단 링크 */}
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
