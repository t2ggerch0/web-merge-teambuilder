import axios from "axios";
import { viewToastSuccess, viewToastError } from "../helper";
import { JoinProjectType } from "../interface";

export const guestApi = {
  joinClass: async (data: JoinProjectType, token: string) => {
    try {
      const response = await axios.post("class/join-class", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 201) {
        viewToastSuccess("성공적으로 프로젝트에 등록되었습니다.");
      }
      return response.data ?? "";
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        const statusCode = e.response.status;
        if (statusCode === 403) {
          viewToastError("입장 코드가 올바르지 않습니다.");
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
