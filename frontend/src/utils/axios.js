// frontend/src/utils/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api', // ✅ 이렇게 바꿔줘야 Vite 프록시와 연결됨
  withCredentials: true, // 로그인 세션 유지 필요 시
});

export default axiosInstance;
