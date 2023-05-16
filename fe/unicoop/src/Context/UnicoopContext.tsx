import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import { getMyToken } from "../helper";
import { baseURL, setHeaders, authApi } from "../API/authApi";
import {
  UnicoopContext,
  unicoopContextDefault,
  MyInfoType,
} from "../interface";

const AuthContext = createContext<UnicoopContext>(unicoopContextDefault);

export const UnicoopProvider = ({ children }: { children: ReactNode }) => {
  const [myInfo, setMyInfo] = useState<MyInfoType | null>(null);

  axios.defaults.baseURL = baseURL;
  // axios.defaults.withCredentials = true;
  setHeaders(getMyToken());

  useEffect(() => {
    const init = async () => {
      try {
        await refreshAuth();
      } catch (e) {}
    };
    init().then();
  }, []);

  const refreshAuth = async () => {
    try {
      const token = getMyToken();
      if (token) {
        const data = await authApi.getMyInfo(token);
        if (data) {
          setMyInfo(data);
        } else {
          throw new Error("error");
        }
      }
    } catch (e) {
      throw new Error("error");
    }
  };

  return (
    <AuthContext.Provider value={{ myInfo, setMyInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
