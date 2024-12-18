import { Popover, Transition } from "@headlessui/react";
import {
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon
} from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "shared/Avatar/Avatar";
import { useAppDispatch, useAppSelector } from "states";
import { logout, selectAuthUserInfo } from "states/slices/auth";


const solutions = [
  {
    name: "Tài khoản",
    href: "/profile",
    icon: UserCircleIcon,
  },
  {
    name: "Cài đặt",
    href: "/settings",
    icon: Cog6ToothIcon,
  },
  {
    name: "Trợ giúp",
    href: "/help",
    icon: QuestionMarkCircleIcon,
  }
];

const solutionsFoot = [
  {
    name: "Đăng xuất",
    action: "logoutAction",
    href: "/",
    icon: ArrowRightOnRectangleIcon,
  },
];

export default function AvatarDropdown() {
  const user = useAppSelector(selectAuthUserInfo);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logoutAction = () => {
    dispatch(logout());
  }

  return (
    <div className="AvatarDropdown">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <Avatar sizeClass="w-8 h-8 sm:w-9 sm:h-9" imgUrl={user?.avatar} />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-[260px] px-4 mt-4 -right-10 sm:right-0 sm:px-0">
                <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid gap-6 bg-white dark:bg-neutral-800 p-7">
                    {solutions.map((item, index) => (
                      <Link
                        key={index}
                        to={item.href}
                        className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      >
                        <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                          <item.icon aria-hidden="true" className="w-6 h-6" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium ">{item.name}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <hr className="h-[1px] border-t border-neutral-300 dark:border-neutral-700" />
                  <div className="relative grid gap-6 bg-white dark:bg-neutral-800 p-7">
                    {solutionsFoot.map((item, index) => (
                      <a
                        key={index}
                        href={item.href}
                        onClick={item.action === "logoutAction" ? logoutAction : () => { }}
                        className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      >
                        <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                          <item.icon aria-hidden="true" className="w-6 h-6" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium ">{item.name}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
