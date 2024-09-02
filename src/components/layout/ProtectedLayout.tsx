import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  logout,
  TUser,
  useCurrentToken,
} from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { Navigate } from "react-router-dom";

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
  if (!user || role !== user.role) {
    dispatch(logout());
    return <Navigate to="/login" replace={true} />;
  }

  // If everything is fine, render the children
  return <>{children}</>;
};

export default ProtectedLayout;
