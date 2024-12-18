import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/auth";
import authForm from "./slices/authForm";
import service from "./slices/service";
import trainer from "./slices/trainer";
import booking from "./slices/booking";

const store = configureStore({
  reducer: {
    auth,
    authForm,
    service,
    trainer,
    booking,
  },
});

export type AppDispatch = typeof store.dispatch;
export default store;
