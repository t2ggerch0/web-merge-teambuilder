import axios from "axios";
import { viewToastError } from "../helper";
import { ProjectRegisterInfo } from "../interface";
import { setHeaders } from "./authApi";

export const hostApi = {
  createClass: async (data: ProjectRegisterInfo, token: string) => {
    try {
      let filteredData = data.isHostParticipating
        ? {
            ...data,
            hostAnswer: data.hostAnswer.map((d) => {
              if (d.questionId === 2) {
                return d.answer.sort();
              } else {
                return d.answer[0];
              }
            }),
            hostPosition: data.isHostParticipating ? data.hostPosition : "",
            positionComposition: data.positionTypes.map(
              (data) => data.composition
            ),
            positionTypes: data.positionTypes.map((data) => data.typeName),
          }
        : {
            ...data,
            hostPosition: data.isHostParticipating ? data.hostPosition : "",
            positionComposition: data.positionTypes.map(
              (data) => data.composition
            ),
            positionTypes: data.positionTypes.map((data) => data.typeName),
          };
      const response = await axios.post("/class/create-class", filteredData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
      return response.data ?? "";
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        viewToastError(e?.response?.data.message);
      }
    }
  },
  getHostClass: async (token: string) => {
    try {
      setHeaders(token);
      // console.log("host header", token);
      return await axios
        .get("class/host", {
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
  formTeam: async (token: string, classId: string) => {
    try {
      // console.log("classId", classId, token, optimalComposition);
      setHeaders(token);
      return await axios
        .post("class/form-team", { classId, optimalComposition: true })
        .then((res) => {
          return res.data ?? "";
        });
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        viewToastError(e?.response?.data.message);
      }
    }
  },
};
