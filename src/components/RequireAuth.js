import { Navigate, useLocation } from "react-router-dom";
import { getUser } from "../util/localStorage.util";

// enclose the protected page in this tag
export default function RequireAuth({ children }) {
  //   get token from local storage
  let location = useLocation();
  let user = getUser();

  // error - when token is not in local storage, redirect to auth
  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
}
