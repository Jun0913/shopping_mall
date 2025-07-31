import { createSlice } from "@reduxjs/toolkit"
import { logoutUser } from "./thunkFunctions";

const initialState = {
  userData: {
    id: '',
    email: '',
    name: '',
    role: 0,
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
