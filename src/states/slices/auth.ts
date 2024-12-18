import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { IRootState } from "../types";
import { GetMeResponse, getMe, postLogout } from "api/auth";

interface AuthState {
  status: "loading" | "success" | "error";
  userInfo: null | GetMeResponse; // for user object
  userToken: null | string; // for storing the JWT
  error: null | object;
}
const initialState: AuthState = {
  status: "loading",
  userInfo: null, // for user object
  userToken: null, // for storing the JWT
  error: null,
};
export const fetchUser = createAsyncThunk("auth/fetchUser", getMe);
export const logout = createAsyncThunk("auth/logout", postLogout);
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "success";
        state.userInfo = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error;
      })
      .addCase(logout.pending, (state) => {
        state.status = "error";
        state.userInfo = null;
      }),
});
export const selectAuth = (state: IRootState) => state.auth;
export const selectAuthStatus = createSelector(
  selectAuth,
  (auth) => auth.status,
);
export const selectAuthUserInfo = createSelector(
  selectAuth,
  (auth) => auth.userInfo,
);
export const selectAuthUserId = createSelector(
  selectAuthUserInfo,
  (userInfo) => userInfo?.id,
);
export default authSlice.reducer;
