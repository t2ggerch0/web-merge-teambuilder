import axios from "axios";
import { viewToastSuccess, viewToastError } from "../helper";
import { QuestionType, RegisterInfo } from "../interface";

export const baseURL =
  "https://port-0-unicoop-nx562olfpi8ozh.sel3.cloudtype.app";

export const setHeaders = (token: string | null) => {
  axios.defaults.headers.common = token
    ? {
        "Access-Control-Allow-Origin": window.location.origin,
        Authorization: `Bearer ${token}`,
      }
    : {
        "Access-Control-Allow-Origin": window.location.origin,
      };
};

export const swrFetcher = async (url: string) => {
  return (await axios.get(url)).data;
};

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
      setHeaders(token);
      // return await axios
      //   .get("/auth/user", { headers: { Authorization: `Bearer ${token}` } })
      //   .then((res) => {
      //     return res.data;
      //   });
      return await axios.get("/auth/user").then((res) => {
        return res.data;
      });
    } catch (e) {
      console.log(e);
      throw new Error("Invalid Token");
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
      if (axios.isAxiosError(e) && e.response) {
        console.log(e.response.data.message);
        viewToastError(e.response.data.message);
        throw new Error(e.response.data.message);
      }
    }
  },
  deleteUser: async ({ email }: { email: string }) => {
    try {
      return axios.delete(`/auth/user?email=${email}`);
    } catch (e) {
      console.log(e);
    }
  },

  deleteAccount: async (email: string) => {
    try {
      const response = await axios.delete("/auth/user", {
        data: { email },
      });
      if (response.status === 200) {
        viewToastSuccess("회원 탈퇴가 성공적으로 완료되었습니다.");
      }
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        const statusCode = e.response.status;
        if (statusCode === 404) {
          viewToastError("존재하지 않는 사용자입니다.");
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
  createClass: async ({
    name,
    capacity,
    startDate,
    endDate,
    token,
  }: {
    name: string;
    capacity: number;
    startDate: string;
    endDate: string;
    token: string;
  }) => {
    try {
      return await axios
        .post(
          "/class/create-class",
          {
            name,
            capacity,
            startDate,
            endDate,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
          console.log(res.data.classId);
          return res.data.classId ?? "";
        });
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        console.log(e.response.data.message);
        viewToastError(e?.response?.data.message);
      }
    }
  },
  joinClass: async ({ classId, token }: { classId: string; token: string }) => {
    try {
      return await axios
        .post(
          "/class/join-class",
          {
            classId,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          console.log("res", res.data);
        });
    } catch (e) {
      console.log(e);
      if (axios.isAxiosError(e) && e.response) {
        console.log(e.response.data.message);
        viewToastError(e?.response?.data.message);
      }
    }
  },
  addDefaultQuestion: async ({
    token,
    classId,
    countScores,
    questionIndexes,
    weights,
  }: {
    token: string;
    classId: string;
    questionIndexes: number[];
    weights: number[];
    countScores: string[];
  }) => {
    try {
      return await axios.post(
        "/class/add-default-questions",
        {
          classId,
          questionIndexes,
          weights,
          countScores,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (e) {
      console.log(e);
      if (axios.isAxiosError(e) && e.response) {
        console.log(e.response.data.message);
        viewToastError(e?.response?.data.message);
      }
    }
  },
  addCustomQuestion: async ({
    token,
    classId,
    questions,
  }: {
    token: string;
    classId: string;
    questions: QuestionType[];
  }) => {
    try {
      return await axios.post(
        "/class/add-custom-questions",
        { classId, questions },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (e) {
      console.log(e);
      if (axios.isAxiosError(e) && e.response) {
        console.log(e.response.data.message);
        viewToastError(e?.response?.data.message);
      }
    }
  },
  getClassInfo: async (classId: string) => {
    try {
      return await axios.get(`/class?classId=${classId}`).then((res) => {
        // console.log(res.data.targetClass);
        const data = res.data.targetClass;
        return {
          answers: data.answers,
          capacity: data.capacity,
          endAnswer: data.endAnswer,
          endDate: data.endDate,
          endQuestion: data.endQuestion,
          name: data.name,
          professor: data.professor,
          questions: data.questions,
          startDate: data.startDate,
          students: data.students,
          teams: data.teams,
          id: data._id,
        };
      });
    } catch (e) {
      console.log(e);
      if (axios.isAxiosError(e) && e.response) {
        // console.log(e.response.data.message);
        viewToastError(e?.response?.data.message);
      }
    }
  },
  getQuestionInfo: async (questionId: string) => {
    try {
      return await axios
        .get(`/question?questionId=${questionId}`)
        .then((res) => {
          console.log(res.data);
        });
    } catch (e) {
      console.log(e);
      if (axios.isAxiosError(e) && e.response) {
        console.log(e.response.data.message);
        viewToastError(e?.response?.data.message);
      }
    }
  },
  endQuestion: async (token: string) => {
    try {
      setHeaders(token);
      return await axios.post("/class/end-question").then((res) => {
        console.log(res.data);
        return res.data;
      });
    } catch (e) {
      console.log(e);
      if (axios.isAxiosError(e) && e.response) {
        console.log(e.response.data.message);
        viewToastError(e?.response?.data.message);
      }
    }
  },
};
