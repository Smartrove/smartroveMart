import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/features/authSlice";

export const ShowOnLogin = ({ children }) => {
  const { isLoggedIn } = useSelector((store) => store["auth"]);

  if (isLoggedIn) {
    return children;
  }
  return null;
};


export const ShowOnLogOut = ({ children }) => {
  const { isLoggedIn } = useSelector((store) => store["auth"]);

  if (!isLoggedIn) {
    return children;
  }
  return null;
};
