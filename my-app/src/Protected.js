import { Navigate } from "react-router-dom";
import Cookies from 'universal-cookie'

const Protected = ({ children }) => {
  const cookies = new Cookies
  const user = cookies.get("username")
  const pass = cookies.get("password")
  const userinfo = cookies.get("userInfo")
  const userManager = cookies.get("userManager")
  if (user === undefined || pass===undefined || userManager ===undefined || userinfo===undefined){
    return <Navigate to="/" replace />;
  }
  return children
};
export default Protected;