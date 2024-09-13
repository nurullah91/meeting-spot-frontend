import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, useCurrentToken } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { Navigate } from "react-router-dom";
import { TUser } from "../../types/user.types";

type TProtectedRouteProps = {
  children: ReactNode;
  role: "admin" | "user" | undefined;
};

const ProtectedLayout = ({ children, role }: TProtectedRouteProps) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(useCurrentToken);

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  // Verify token and get user data
  const user = verifyToken(token) as TUser | undefined;

  // If token is invalid or user role does not match, log out and redirect to login
  if (!user) {
    dispatch(logout());
    return <Navigate to="/login" replace={true} />;
  }

  // Role-based access control
  if (
    (role === "admin" && user.role !== "admin") || // If route is for admin and user is not admin
    (role === "user" && user.role !== "user" && user.role !== "admin") // If route is for user and user is not user or admin
  ) {
    return <Navigate to="/unauthorized" replace={true} />; // Redirect to an unauthorized page or login
  }
  // If everything is fine, render the children
  return <>{children}</>;
};

export default ProtectedLayout;
