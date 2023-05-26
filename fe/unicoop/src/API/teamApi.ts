import axios from "axios";
import { viewToastError } from "../helper";
import { TeamMessage } from "../interface";

export const teamApi = {
  getTeamInfo: async (classId: string, token: string) => {
    try {
      const response = await axios.get(`team/${classId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data ?? "";
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        const statusCode = e.response.status;
        if (statusCode === 403) {
          viewToastError("참여한 팀이 없습니다.");
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
