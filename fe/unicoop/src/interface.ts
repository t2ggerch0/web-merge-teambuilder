import { HeadersDefaults } from "axios";
import { Dayjs } from "dayjs";

export type UnicoopContext = {
  myInfo: null | MyInfoType;
  setMyInfo(e: null | MyInfoType): void;
};

export enum Menu {
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
  userType: UserTypeType;
  studentId: number;
  major: string;
  password: string;
  verifyCode: number;
};

export enum ScoringType {
  points = "points",
  single = "single",
  multi = "multi",
}

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

export type UserTypeType = "student" | "professor" | "";

export type MyInfoType = {
  name: string;
  email: string;
  password: string;
  userType?: string;
  classes: string[];
  major: string;
  studentId: number;
  id: string;
  token: string;
};

export type ClassType = {
  id: string;
  professor: string[];
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

export type AxiosRequestHeaders = Record<string, string>;

export interface CommonHeaderProperties extends HeadersDefaults {
  "Access-Control-Allow-Origin": string;
  Authorization: string;
}
