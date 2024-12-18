import {
  TypedUseSelectorHook,
  useDispatch as defaultUseDispatchHook,
  useSelector as defaultUseSelectorHook,
} from "react-redux";
import type { AppDispatch } from "./store";
import store from "./store";
import { IRootState } from "./types";

const useAppDispatch = defaultUseDispatchHook<AppDispatch>;
const useAppSelector: TypedUseSelectorHook<IRootState> = defaultUseSelectorHook;
export * from "./store";
export { store, useAppDispatch, useAppSelector };
