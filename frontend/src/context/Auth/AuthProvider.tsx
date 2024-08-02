import { FC, PropsWithChildren, useState } from "react";
import { AuthContext } from "./AuthContext";
import { BASE_URL } from "../../constants/baseurl";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [error, setError] = useState("");
  const [username, setUsername] = useState<string | null>(
    localStorage.getItem("username")
  );
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const isAuthenticated = !!token;

  const login = (username: string, token: string) => {
    setUsername(username);
    setToken(token);
    localStorage.setItem("username", username);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    setUsername(null);
    setToken(null);
  };
  const [orders, setOrders] = useState([]);
  const getordrs = async () => {
    try {
      const response = await fetch(`${BASE_URL}/user/order`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to login. Please check your credentials.");
      }
      if (!token) {
        throw new Error("Failed to retrieve token. Please try again.");
      }

      const data = await response.json();
      setOrders(data);
    } catch (error) {
      setError("somthing went wrong");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        username,
        token,
        orders,
        login,
        isAuthenticated,
        logout,
        getordrs,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
