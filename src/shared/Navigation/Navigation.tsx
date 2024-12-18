import { NAVIGATION_DEMO } from "assets/data/navigation";
import { useAppSelector } from "states";
import { selectAuthUserInfo } from "states/slices/auth";
import NavigationItem from "./NavigationItem";

function Navigation() {
  const user = useAppSelector(selectAuthUserInfo);
  return (
    <ul className="nc-Navigation hidden lg:flex lg:flex-wrap lg:items-center lg:space-x-1 relative">
      {NAVIGATION_DEMO.map((item) => (
        item.role && user?.role !== item.role ? null :
          <NavigationItem key={item.id} menuItem={item} />
      ))}
    </ul>
  );
}

export default Navigation;
