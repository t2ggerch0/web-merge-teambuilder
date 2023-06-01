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
      console.log("axios erro?", e);
      if (axios.isAxiosError(e) && e.response) {
        console.log(e.response.data.message);
        const statusCode = e.response.status;
        if (statusCode === 403) {
          // viewToastError("입장 코드가 올바르지 않습니다.");
          viewToastError(e.response.data.message);
        } else if (statusCode === 500) {
          viewToastError(
            "서버에 오류가 발생하였습니다. 잠시 후에 다시 시도해주세요."
          );
        } else {
          // viewToastError(
          //   "예기치 않은 오류가 발생하였습니다. 잠시 후에 다시 시도해주세요."
          // );
          viewToastError(e.response.data.message);
        }
      } else {
        viewToastError(
          "알 수 없는 오류가 발생하였습니다. 잠시 후에 다시 시도해주세요."
        );
      }
    }
  },
  getGuestClass: async (token: string) => {
    try {
      const response = await axios.get("class/guest", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data ?? "";
    } catch (e) {
      viewToastError(
        "서버에 오류가 발생하였습니다. 잠시 후에 다시 시도해주세요."
      );
    }
  },
  getTeamInfo: async (projectId: string, token: string) => {
    try {
      return await axios
        .get(`/team?classId=${projectId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          return res.data ?? "";
        });
    } catch (e) {
      viewToastError(
        "서버에 오류가 발생하였습니다. 잠시 후에 다시 시도해주세요."
      );
    }
  },
  getAllClasses: async () => {
    try {
      const response = await axios.get(`class/all`);
      return response.data ?? "";
    } catch (e) {
      viewToastError(
        "서버에 오류가 발생하였습니다. 잠시 후에 다시 시도해주세요."
      );
    }
  },
  getQuestions: async (classId: string) => {
    try {
      const response = await axios.get(`question?classId=${classId}`);
      return response.data ?? "";
    } catch (e) {
      viewToastError(
        "서버에 오류가 발생하였습니다. 잠시 후에 다시 시도해주세요."
      );
    }
  },
  getClass: async (classId: string) => {
    try {
      const response = await axios.get(`/class?classId=${classId}`);
      return response.data ?? "";
    } catch (e) {
      viewToastError(
        "서버에 오류가 발생하였습니다. 잠시 후에 다시 시도해주세요."
      );
    }
  },
};
