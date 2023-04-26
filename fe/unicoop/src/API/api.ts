import axios from "axios";
import { viewToastSuccess, viewToastError } from "../helper";
import { RegisterInfo } from "../interface";

// import { CommonHeaderProperties } from "../interface";

export const baseURL =
  "https://port-0-unicoop-nx562olfpi8ozh.sel3.cloudtype.app";

/*export const setHeaders = (token: string | null) => {
  axios.defaults.headers = {
    "Access-Control-Allow-Origin": window.location.origin,
    Authorization: token ? `Bearer ${token}` : "",
  } as CommonHeaderProperties;
};*/

export const api = {
  sendCode: async (email: string) => {
    try {
      const response = await axios.post("/auth/email", {
        email,
      });
      if (response.status === 200) {
        viewToastSuccess("인증 코드가 성공적으로 발송되었습니다.");
      }
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        const statusCode = e.response.status;
        if (statusCode === 409) {
          viewToastError(
            "이미 등록된 사용자가 있거나 잘못된 학교 이메일 정보입니다."
          );
        } else if (statusCode === 500) {
          viewToastError(
            "서버에 오류가 발생하였습니다. 잠시 후에 다시 시도해주세요."
          );
        } else {
          viewToastError(
            "예기치 않은 오류가 발생하였습니다. 잠시 후에 다시 시도해주세요."
          );
        }
      } else {
        viewToastError(
          "알 수 없는 오류가 발생하였습니다. 잠시 후에 다시 시도해주세요."
        );
      }
    }
  },
  verifyCode: async ({
    isPasswordValid,
    passwordConfirm,
    registerInfo,
    changeBoxContent,
  }: {
    isPasswordValid: boolean;
    passwordConfirm: string;
    registerInfo: RegisterInfo;
    changeBoxContent: () => void;
  }) => {
    const { name, studentId, major, password, verifyCode, email, userType } =
      registerInfo;

    if (userType !== "student" && userType !== "professor") {
      viewToastError("회원 가입 유형을 선택해주세요.");
      return;
    } else if (name === "") {
      viewToastError("이름을 입력해주세요.");
      return;
    } else if (studentId === 0) {
      viewToastError("학번을 입력해주세요.");
      return;
    } else if (major === "") {
      viewToastError("전공을 입력해주세요.");
      return;
    } else if (!password || !isPasswordValid || password !== passwordConfirm) {
      viewToastError("비밀번호를 올바르게 입력하셨는지 확인해주세요.");
      return;
    }
    try {
      await axios
        .post("/auth/verify", {
          email,
          password,
          userType,
          verifyCode,
          name,
          studentId,
          major,
        })
        .then(() => {
          viewToastSuccess("회원가입에 성공했습니다.");
          setTimeout(() => {
            changeBoxContent();
          }, 3000);
        });
    } catch (e) {
      viewToastError("인증코드가 올바르지 않습니다.");
    }
  },
  getUserInfoByToken: async (token: string) => {
    try {
      return await axios
        .get("/auth/user", { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          return res.data;
        });
    } catch (e) {
      console.log(e);
    }
  },
  login: async ({ email, password }: { email: string; password: string }) => {
    try {
      return await axios
        .post("/auth/login", {
          email,
          password,
        })
        .then((res) => {
          if (res.data.code === 1) {
            localStorage.setItem("token", res.data.token);
            return res.data.token;
          }
        });
    } catch (e) {
      viewToastError("일치하는 회원정보가 없습니다!");
      console.log(e);
    }
  },
  deleteUser: async ({ email }: { email: string }) => {
    try {
      return axios.delete(`/auth/user?email=${email}`);
    } catch (e) {
      console.log(e);
    }
  },
};
