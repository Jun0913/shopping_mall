import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser } from "./thunkFunctions"; // loginUser 추가

const initialState = {
  userData: {
    id: '',
    email: '',
    name: '',
    role: 'user',
    image: '',
  },
  isAuth: false,
  isLoading: false,
  error: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser: () => initialState, // 명시적 초기화 액션
  },
  extraReducers: (builder) => {
    builder
      // [1] 로그인 처리 추가
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload.user;
        state.isAuth = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || '로그인 실패';
      })

      // [2] 로그아웃 처리
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(logoutUser.fulfilled, () => {
        return initialState;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || '로그아웃 실패';
      });
  }
});

export const { resetUser } = userSlice.actions;
export default userSlice.reducer;
