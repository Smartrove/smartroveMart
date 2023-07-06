import { useSelector } from "react-redux";

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
