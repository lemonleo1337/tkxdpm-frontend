import { postLogin } from "api/auth";
import {
  PayloadAction,
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { IRootState } from "../types";
type AuthForm = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};
interface AuthFormState {
  status: "idle" | "loading" | "success" | "error";
  form: Partial<AuthForm>;
  error: string | null;
  errors: Partial<AuthForm>;
}
const initialState: AuthFormState = {
  status: "idle",
  form: {},
  error: null,
  errors: {},
};
export const login = createAsyncThunk("authForm/login", postLogin);
export const authFormSlice = createSlice({
  name: "authForm",
  initialState,
  reducers: {
    setForm: (state, action: PayloadAction<Partial<AuthForm>>) => {
      state.form = { ...state.form, ...action.payload };
    },
    resetForm: (state) => {
      state.form = {};
      state.error = null;
      state.errors = {};
      state.status = "idle";
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state) => {
        state.form = {};
        state.status = "success";
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message || null;
        state.errors = action.payload as Partial<AuthForm>;
      }),
});
export const selectAuthForm = (state: IRootState) => state.authForm;
export const selectAuthFormValue = createSelector(
  selectAuthForm,
  (state) => state.form,
);
export const selectAuthFormStatus = createSelector(
  selectAuthForm,
  (state) => state.status,
);
export const selectAuthFormError = createSelector(
  selectAuthForm,
  (state) => state.error,
);
export const selectAuthFormErrors = createSelector(
  selectAuthForm,
  (state) => state.errors,
);
export const { setForm, resetForm } = authFormSlice.actions;
export default authFormSlice.reducer;
