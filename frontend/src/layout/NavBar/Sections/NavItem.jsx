import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { resetUser } from '../../../store/userSlice';
import { logoutUser } from './../../../store/thunkFunctions';
 // 💡 수동 초기화 액션

const routes = [
  { to: '/login', name: '로그인', auth: false },
  { to: '/register', name: '회원가입', auth: false },
  { to: '', name: '로그아웃', auth: true },
];

const NavItem = ({ mobile }) => {
  const isAuth = useSelector((state) => state.user?.isAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await dispatch(logoutUser());

      if (res?.meta?.requestStatus === 'fulfilled') {
        dispatch(resetUser());         // ✅ 리덕스 상태 초기화
        navigate('/');                // ✅ 홈으로 이동
      }
    } catch (err) {
      console.error('로그아웃 실패:', err);
    }
  };

  return (
    <ul className={`text-md justify-center w-full flex gap-4 ${mobile && 'flex-col bg-gray-900 h-full'} items-center`}>
      {routes.map(({ to, name, auth }) => {
        if (isAuth !== auth) return null;

        if (name === '로그아웃') {
          return (
            <li key={name} className="py-2 text-center border-b-4 cursor-pointer">
              <button onClick={handleLogout} className="text-white hover:text-gray-300">
                {name}
              </button>
            </li>
          );
        } else {
          return (
            <li key={name} className="py-2 text-center border-b-4 cursor-pointer">
              <Link to={to} className="text-white hover:text-gray-300">
                {name}
              </Link>
            </li>
          );
        }
      })}
    </ul>
  );
};

export default NavItem;
