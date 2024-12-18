import { Role } from "enums";
import { NavItemType } from "shared/Navigation/NavigationItem";
import ncNanoId from "utils/ncNanoId";

export const NAVIGATION_DEMO: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/",
    name: "Trang chủ",
    // type: "dropdown",
  },
  {
    id: ncNanoId(),
    href: "/services",
    name: "Dịch vụ",
  },
  {
    id: ncNanoId(),
    href: "/trainers",
    name: "Huấn luyện viên",
  },
  {
    id: ncNanoId(),
    href: "/member/body-info",
    name: "Thông số cơ thể",
    role: Role.MEMBER,
  },
  {
    id: ncNanoId(),
    href: "/member/schedules",
    name: "Lịch tập",
    role: Role.MEMBER,
  },
  {
    id: ncNanoId(),
    href: "/trainer/booking-history",
    name: "Lịch sử đặt lịch",
    role: Role.TRAINER,
  },
  {
    id: ncNanoId(),
    href: "/trainer/schedules",
    name: "Lịch dạy",
    role: Role.TRAINER,
  },
];
