import { HeadersDefaults } from "axios";
import dayjs, { Dayjs } from "dayjs";

export type UnicoopContext = {
  myInfo: null | MyInfoType;
  setMyInfo(e: null | MyInfoType): void;
};

export enum Menu {
  JoinProject,
  ManagementProject,
  RegisterProject,
  Activity,
}

export const unicoopContextDefault = {
  myInfo: null,
  setMyInfo: () => {},
};

export type RegisterInfo = {
  name: string;
  email: string;
  password: string;
  verifyCode: number;
};

export type ProjectRegisterInfo = {
  className: string;
  classType: string;
  classDescription: string;
  positionTypes: positionTypes[];
  hostPosition: string;
  recruitStartDate: Dayjs;
  recruitEndDate: Dayjs;
  activityStartDate: Dayjs;
  activityEndDate: Dayjs;
  isSecret: boolean;
  isHostParticipating: boolean;
  questionIds: number[];
};

export type JoinProjectType = {
  classId: string;
  accessKey: number;
  position: string;
  answers: Array<AnswersType>;
};

export type AnswersType = {
  questionId: string;
  answer: number;
};

export type positionTypes = {
  typeName: string;
  composition: number;
};

export type QuestionType = {
  id: number;
  title: string;
  options: string[] | number[];
  weight: number;
  countScore: string;
};

export type MyInfoType = {
  name: string;
  email: string;
  password: string;
  classes: string[];
  id: string;
  token: string;
};

export const dummyMyInfo: MyInfoType = {
  classes: [],
  email: "",
  id: "",
  name: "",
  password: "",
  token: "",
};

export type ClassType = {
  _id: string;
  professor: string;
  name: string;
  students: number[];
  teams: number[];
  questions: string[];
  answers: string[];
  capacity: number;
  startDate: string;
  endDate: string;
  endQuestion: boolean;
  endAnswer: boolean;
};
export type TeamMessage = {
  message: string;
  teamId: number;
};
export type NewClassType = {
  _id: string;
  host: string;
  guest: Array<string>;
  teams: Array<string>;
  questions: Array<string>;
  answers: Array<string>;
  className: string;
  classDescription: string;
  classType: string;
  positionTypes: Array<string>;
  positionComposition: Array<number>;
  positionCounts: Array<number>;
  recruitStartDate: Date;
  recruitEndDate: Date;
  activityStartDate: Date;
  activityEndDate: Date;
  isSecret: boolean;
  isHostParticipating: boolean;
  accessKey: number;
};

export type TeamInfo = {
  _id: string;
  name: string;
  leader: string;
  members: Array<string>;
  chat: Array<ChatInfo>;
};

export type ChatInfo = {
  sender: string;
  message: string;
  createdAt: Date;
};

export const defaultQuestions: ProjectRegisterInfo = {
  className: "",
  classType: "web",
  classDescription: "",
  positionTypes: [
    { typeName: "frontend", composition: 1 },
    { typeName: "backend", composition: 1 },
  ],

  hostPosition: "frontend",
  recruitStartDate: dayjs(new Date()),
  recruitEndDate: dayjs(new Date()),
  activityStartDate: dayjs(new Date()),
  activityEndDate: dayjs(new Date()),
  isSecret: true,
  isHostParticipating: true,
  questionIds: [0, 1, 2, 3],
};

export type AxiosRequestHeaders = Record<string, string>;

export interface CommonHeaderProperties extends HeadersDefaults {
  "Access-Control-Allow-Origin": string;
  Authorization: string;
}
