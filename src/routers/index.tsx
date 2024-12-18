import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "states";
import { fetchUser, selectAuthStatus } from "states/slices/auth";
import useWindowSize from "../hooks/useWindowResize";
import { Page } from "./types";
import DefaultLayout from "./DefaultLayout";
import AuthLayout from "./AuthLayout";
import { Role } from "enums";
import { ToastContainer } from "react-toastify";
import { nanoid } from "@reduxjs/toolkit";
import LoadingIcon from "shared/LoadingIcon/LoadingIcon";

const LazyLoad = (Component: () => Promise<{ default: React.ComponentType<any> }>) => {
  const ComponentLazy = React.lazy(Component)
  return (props: any) => (
    <React.Suspense fallback={null}>
      <ComponentLazy {...props} />
    </React.Suspense>
  )
}

const PageHome = LazyLoad(() => import("pages/public/PageHome"));
const Page404 = LazyLoad(() => import("pages/error/Page404"));
const Page403 = LazyLoad(() => import("pages/error/Page403"));
const FooterNav = LazyLoad(() => import("components/FooterNav"))
const ScrollToTop = LazyLoad(() => import("./ScrollToTop"));
const SiteHeader = LazyLoad(() => import("components/SiteHeader"));
const Footer = LazyLoad(() => import("shared/Footer/Footer"));
const Login = LazyLoad(() => import("pages/auth/Login"));
const Register = LazyLoad(() => import("pages/auth/Register"));
const PageService = LazyLoad(() => import("pages/public/Service/List"));
const PageServiceDetail = LazyLoad(() => import("pages/public/Service/Detail"));
const ServicePaymentDone = LazyLoad(() => import("pages/public/Service/Payment"));
const PageTrainer = LazyLoad(() => import("pages/public/Trainer/List"));
const PageTrainerDetail = LazyLoad(() => import("pages/public/Trainer/Detail"));
const PageBookingDetail = LazyLoad(() => import("pages/private/member/Schedule/detail"));
const PageSchedule = LazyLoad(() => import("pages/private/member/Schedule"));
const PageCreateBooking = LazyLoad(() => import("pages/private/member/Schedule/create"));
const PageBodyInfo = LazyLoad(() => import("pages/private/member/BodyInfo"));
export const authPages: Page[] = [
  { path: "/login", component: Login },
  { path: "/signup", component: Register },
];
export const publicPages: Page[] = [
  { path: "/services", component: PageService },
  { path: "/services/:id", component: PageServiceDetail },
  { path: "/services/pay-done", component: ServicePaymentDone },
  { path: "/", component: PageHome },
  { path: "/trainers", component: PageTrainer },
  { path: "/trainers/:id", component: PageTrainerDetail },
];

export const memberPages: Page[] = [
  { path: "/member/body-info", component: PageBodyInfo },
  { path: "/member/schedules", component: PageSchedule },
  { path: "/member/schedules/:id", component: PageBookingDetail },
  { path: "/member/bookings/create", component: PageCreateBooking },
];

export const trainerPages: Page[] = [
  { path: "/trainer/booking-history", component: PageTrainer },
  { path: "/body-info", component: PageTrainer },
];

const MyRoutes = () => {
  const WIN_WIDTH = useWindowSize().width || window.innerWidth;
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(selectAuthStatus);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (authStatus === "loading") return (
    <div className="flex justify-center items-center h-screen">
      <LoadingIcon size={50} />
    </div>
  );

  return (
    <BrowserRouter>
      <ToastContainer />
      <ScrollToTop />
      <SiteHeader />

      <Routes>
        {publicPages.map(({ component, path }) => {
          const Component = component;
          return <Route key={nanoid()} element={<Component />} path={path} />;
        })}

        {authPages.map(({ component, path }) => {
          const Component = component;
          return (
            <Route key={nanoid()} element={<AuthLayout allowRoles={[]} />}>
              <Route key={nanoid()} path={path} element={<Component />} />
            </Route>
          );
        })}

        {memberPages.map(({ component, path }) => {
          const Component = component;
          return (
            <Route key={nanoid()} element={<DefaultLayout allowRoles={[Role.MEMBER]} />}>
              <Route key={nanoid()} path={path} element={<Component />} />
            </Route>
          );
        })}

        {trainerPages.map(({ component, path }) => {
          const Component = component;
          return (
            <Route key={nanoid()} element={<DefaultLayout allowRoles={[Role.TRAINER]} />}>
              <Route key={nanoid()} path={path} element={<Component />} />
            </Route>
          );
        })}

        <Route key={nanoid()} path="*" element={<Page404 />} />
        <Route key={nanoid()} path="/403" element={<Page403 />} />
      </Routes>

      {WIN_WIDTH < 768 && <FooterNav />}
      <Footer />
    </BrowserRouter>
  );
};

export default MyRoutes;
