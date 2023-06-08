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

export const parseTextFromOptions = (options: number[]) => {
  let res: string[] = [];
  options.map((o) => {
    let temp = "";

    if (o === 0) {
      temp = "월요일 오후";
    } else if (o === 1) {
      temp = "화요일 오후";
    } else if (o === 2) {
      temp = "수요일 오후";
    } else if (o === 3) {
      temp = "목요일 오후";
    } else if (o === 4) {
      temp = "금요일 오후";
    } else if (o === 5) {
      temp = "토요일 오전";
    } else if (o === 6) {
      temp = "토요일 오후";
    } else if (o === 7) {
      temp = "일요일 오전";
    } else {
      temp = "일요일 오후";
    }
    res.push(temp);
  });
  return res;
};
