import axios from "axios";
import { viewToastError } from "../helper";
import { TeamMessage } from "../interface";
import { setHeaders } from "./authApi";

export const teamApi = {
  getTeamInfo: async (classId: string, token: string) => {
    try {
      setHeaders(token);
      const response = await axios.get(`team?classId=${classId}`, {
        headers: { Authorization: `${token}` },
      });
      return response.data ?? "";
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        const statusCode = e.response.status;
        if (statusCode === 403) {
          viewToastError("이 프로젝트는 아직 팀이 만들어지지 않았습니다.");
          return statusCode;
        } else {
          viewToastError(
            "서버에 오류가 발생하였습니다. 잠시 후에 다시 시도해주세요."
          );
        }
      }
    }
  },
  createTeamMessage: async (token: string, teamMessage: TeamMessage) => {
    try {
      const response = await axios.post("team/message", teamMessage, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data ?? "";
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        const statusCode = e.response.status;
        if (statusCode === 404) {
          viewToastError("해당 팀이 없습니다.");
        } else {
          viewToastError(
            "서버에 오류가 발생하였습니다. 잠시 후에 다시 시도해주세요."
          );
        }
      }
    }
  },
};
