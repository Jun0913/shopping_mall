import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/thunkFunctions';
import { Link, useNavigate } from 'react-router-dom'; // ✅ 추가
import { AiOutlineEye } from 'react-icons/ai';

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ mode: 'onChange' });

  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ 추가
  const [showPassword, setShowPassword] = useState(false);

  // ✅ 로그인 처리 응답 확인 로직 추가
  const onSubmit = async ({ username, password }) => {
    const body = { username, password };

    try {
      const res = await dispatch(loginUser(body)).unwrap(); // ✅ 응답 처리

      alert(`${res.user.name}님 환영합니다!`); // ✅ 성공 알림
      navigate('/'); // ✅ 메인 페이지 이동
    } catch (error) {
      console.error('❌ 로그인 오류:', error); // ✅ 콘솔 확인용
      alert(error.error || '로그인에 실패했습니다.'); // ✅ 실패 알림
    }

    reset(); // ✅ 폼 초기화
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-900 to-neutral-700 px-4">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-8">로그인</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* 아이디 입력 */}
          <div>
            <label htmlFor="username" className="text-sm text-black-900 block mb-1">아이디</label>
            <input
              id="username"
              type="text"
              placeholder="아이디 입력"
              className="w-full border-b border-gray-300 focus:outline-none py-2 px-1 bg-transparent"
              {...register('username', { required: '필수 필드입니다.' })}
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* 비밀번호 입력 */}
          <div className="relative">
            <label htmlFor="password" className="text-sm text-black-900 block mb-1">비밀번호</label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="비밀번호 입력"
              className="w-full border-b border-gray-300 focus:outline-none py-2 px-1 bg-transparent pr-10"
              {...register('password', {
                required: '필수 필드입니다.',
                minLength: { value: 6, message: '최소 6자입니다.' }
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute top-8 right-2 text-gray-400"
            >
              <AiOutlineEye size={20} />
            </button>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-full font-semibold transition"
          >
            로그인
          </button>
        </form>

        {/* 하단 링크 */}
        <div className="text-center mt-6 text-sm text-gray-500 space-x-2">
          <Link to="/find-id" className="hover:underline">아이디 찾기</Link>
          <span>|</span>
          <Link to="/register" className="hover:underline">회원가입</Link>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
