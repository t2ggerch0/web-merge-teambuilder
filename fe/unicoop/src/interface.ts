import { HeadersDefaults } from "axios";

export type UnicoopContext = {
  myInfo: null | MyInfoType;
  setMyInfo(e: null | MyInfoType): void;
};

export enum Menu {
  ManagementProejct,
  RegisterProject,
  Acitivty,
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
  capacity: number;
  startDate: string;
  endDate: string;
  questions: QuestionType[];
};

export type QuestionType = {
  title: string;
  type: string;
  options: string[];
  isMandatory: boolean;
  weight: number;
  scoringType: string;
  countScore: string;
  id: string;
};

export type UserTypeType = "student" | "professor" | "";

export type MyInfoType = {
  name: string;
  email: string;
  password: string;
  userType: string;
  classes: string[];
  major: string;
  studentId: number;
  id: string;
  token: string;
};

export type AxiosRequestHeaders = Record<string, string>;

export interface CommonHeaderProperties extends HeadersDefaults {
  "Access-Control-Allow-Origin": string;
  Authorization: string;
}
