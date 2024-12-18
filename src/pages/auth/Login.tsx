import facebookSvg from "images/Facebook.svg";
import googleSvg from "images/Google.svg";
import twitterSvg from "images/Twitter.svg";
import { FC } from "react";
import { useForm, } from 'react-hook-form';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import { useAppDispatch, useAppSelector } from "states";
import { fetchUser } from "states/slices/auth";
import { login, selectAuthFormError, selectAuthFormStatus, selectAuthFormValue } from "states/slices/authForm";
import customToastify from "utils/customToastify";
export interface PageLoginProps {
  className?: string;
}

const loginSocials = [
  {
    name: "Tiếp tục với Facebook",
    href: "#",
    icon: facebookSvg,
  },
  {
    name: "Tiếp tục với Twitter",
    href: "#",
    icon: twitterSvg,
  },
  {
    name: "Tiếp tục với Google",
    href: "#",
    icon: googleSvg,
  },
];

const PageLogin: FC<PageLoginProps> = ({ className = "" }) => {
  const dispatch = useAppDispatch();
  const formValues = useAppSelector(selectAuthFormValue);
  const formStatus = useAppSelector(selectAuthFormStatus);
  const formError = useAppSelector(selectAuthFormError);
  const { register, reset, handleSubmit } = useForm()
  const navigate = useNavigate();
  const locationState = useLocation();

  const submitForm = (data: any) => {
    dispatch(login(data)).then((res: any) => {
      if (res.payload) {
        dispatch(fetchUser());
        reset();
        const { pathname, search } = locationState?.state?.redirectTo
        navigate(`${pathname}${search}`);
      }
      else {
        customToastify({ message: "Đăng nhập thất bại", type: "error" });
      }
    })
  };

  return (
    <div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
      {/* <Helmet>
        <title>Login || Booking React Template</title>
      </Helmet> */}
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Login
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          <div className="grid gap-3">
            {loginSocials.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="nc-will-change-transform flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              >
                <img
                  className="flex-shrink-0"
                  src={item.icon}
                  alt={item.name}
                />
                <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                  {item.name}
                </h3>
              </a>
            ))}
          </div>
          {/* OR */}
          <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div>
          {/* FORM */}
          <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit(submitForm)}>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>
              <Input
                type="email"
                className="mt-1"
                value={formValues.email}
                {...register('email')}
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
                <Link to="/forgot-pass" className="text-sm">
                  Forgot password?
                </Link>
              </span>
              <Input
                type="password"
                className="mt-1"
                value={formValues.password}
                {...register('password')}
              />
            </label>
            <ButtonPrimary
              type="submit"
              disabled={formStatus === "loading"}
            >
              Continue
            </ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            New user? {` `}
            <Link to="/signup">Create an account</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
