import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "states";
import { selectAuthStatus, selectAuthUserInfo } from "states/slices/auth";
type Props = {
    redirectPath?: string;
    allowRoles: any;
};
const DefaultLayout = ({ allowRoles }: { allowRoles: any }) => {
    const authStatus = useAppSelector(selectAuthStatus);
    const user = useAppSelector(selectAuthUserInfo);

    if (authStatus != "success") return <Navigate to="/login" state={{ isAuth: false }} />
    if (allowRoles && !allowRoles.includes(user?.role)) return <Navigate to="/403" />
    return (
        <Outlet />
    )
}
export default DefaultLayout;