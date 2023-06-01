import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MyInfoType } from "./interface";
import { authApi } from "./API/authApi";

export const viewToastSuccess = (message: string) => {
  toast.success(message, { autoClose: 3000, toastId: "success-message" });
};

export const viewToastError = (message: string) => {
  toast.error(message, { autoClose: 3000, toastId: "error-message" });
};

export const viewToastInfo = (message: string) => {
  toast.info(message, { autoClose: 3000, toastId: "info-message" });
};

export const parseSemesterFromStartDate = (date: string) => {
  const temp = new Date(date);
  const year = temp.getFullYear();
  if (temp.getMonth() < 8) {
    return `${year}-1`;
  } else {
    return `${year}-2`;
  }
};

export const getMyToken = () => {
  return window.localStorage.getItem("token");
};

export const setMyInfo = (myInfo: MyInfoType) => {
  window.localStorage.setItem("myInfo", JSON.stringify(myInfo));
};

export const getMyInfo = () => {
  let temp = window.localStorage.getItem("myInfo");
  let token = getMyToken() ?? "";
  if (temp == null) {
    authApi.getMyInfo(token).then((res) => {
      setMyInfo({
        classes: res?.user.classes ?? [],
        email: res?.user.email ?? "",
        id: res?.user._id ?? "",
        name: res?.user.name ?? "",
        password: res?.user.password ?? "",
        token: token,
      });
    });
  } else {
    return JSON.parse(temp);
  }
};
