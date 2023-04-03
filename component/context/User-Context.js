import { useState, createContext, useContext, useEffect } from "react";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const router = useRouter();
  const [User, setUser] = useState({
    username: "",
    email: "",
    userID: "",
  });
  const [authenticated, setAuthenticated] = useState(false);
  const [userSync, setUserSync] = useState(false);
  const getAuthUser = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser();
      if (authUser) {
        setAuthenticated(true);
        console.log("user authenticated", authUser);
        const userAtr = authUser.attributes;
        setUser({
          ...User,
          email: userAtr.email,
          userID: userAtr.sub,
          username: authUser.username,
        });
      } else {
        console.log("not authenticated");
        setAuthenticated(false);
      }
    } catch (err) {
      console.log("auth err",err)
      setAuthenticated(false)
    }
  };
  useEffect(() => {
    getAuthUser();
    if (authenticated) {
      router.push("/");
    } else {
      router.push("/login");
    }
  }, [userSync]);
  const syncUser = () => setUserSync(!userSync);
  const contextValues = { User, setUser, authenticated, syncUser };
  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
};
export const useAuthUser = () => useContext(UserContext);
