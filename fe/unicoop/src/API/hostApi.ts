import axios from "axios";
import { viewToastError } from "../helper";
import { ProjectRegisterInfo } from "../interface";
import { setHeaders } from "./authApi";

export const hostApi = {
  createClass: async (data: ProjectRegisterInfo, token: string) => {
    try {
      const response = await axios.post(
        "/class/create-class",
        {
          ...data,
          hostPosition: data.isHostParticipating ? data.hostPosition : "",
          positionComposition: data.positionTypes.map(
            (data) => data.composition
          ),
          positionTypes: data.positionTypes.map((data) => data.typeName),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
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
      console.log("host header", token);
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
  formTeam: async (
    token: string,
    classId: string,
    optimalComposition: boolean
  ) => {
    try {
      setHeaders(token);
      return await axios
        .post("class/form-team", {
          headers: { Authorization: `Bearer ${token}` },
          data: { classId, optimalComposition },
        })
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
