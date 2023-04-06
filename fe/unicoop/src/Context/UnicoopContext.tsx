import React, { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";
import { baseURL } from "../API/api";
import {
  UnicoopContext,
  unicoopContextDefault,
  MyInfoType,
} from "../interface";

const AuthContext = createContext<UnicoopContext>(unicoopContextDefault);

export const UnicoopProvider = ({ children }: { children: ReactNode }) => {
  const [myInfo, setMyInfo] = useState<MyInfoType | null>(null);

  axios.defaults.baseURL = baseURL;
  //axios.defaults.withCredentials = true;

  return (
    <AuthContext.Provider value={{ myInfo, setMyInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
