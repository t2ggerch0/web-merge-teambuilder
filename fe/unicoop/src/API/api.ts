import axios from "axios";
import { viewToastSuccess, viewToastError } from "../helper";
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
      const response = await axios.post("/email", {
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
};
