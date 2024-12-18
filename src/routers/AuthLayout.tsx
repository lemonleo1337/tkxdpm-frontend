import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "states";
import { selectAuthStatus } from "states/slices/auth";

const AuthLayout = ({ allowRoles }: { allowRoles: any }) => {
    const authStatus = useAppSelector(selectAuthStatus);

    if (authStatus !== 'error') return <Navigate to="/" />

    return (
        <Outlet />
    )
}
export default AuthLayout;