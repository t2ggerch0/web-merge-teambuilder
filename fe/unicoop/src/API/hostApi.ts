import axios from "axios";
import { viewToastError } from "../helper";
import { ProjectRegisterInfo } from "../interface";

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
};
