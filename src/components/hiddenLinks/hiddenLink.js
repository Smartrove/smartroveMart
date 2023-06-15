import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/features/authSlice";

const ShowOnLogin = ({ children }) => {
  const { isLoggedIn } = useSelector((store) => store["auth"]);

  if (isLoggedIn) {
    return children;
  }
  return null;
};

export default ShowOnLogin;

export const ShowOnLogOut = ({ children }) => {
  const { isLoggedIn } = useSelector((store) => store["auth"]);

  if (!isLoggedIn) {
    return children;
  }
  return null;
};
