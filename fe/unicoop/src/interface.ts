import { HeadersDefaults } from "axios";

export type UnicoopContext = {
  myInfo: null | MyInfoType;
  setMyInfo(e: null | MyInfoType): void;
};

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

export type ProjectRegisterInfo = {
  className: string;
  capacity: number;
  startDate: string;
  endDate: string;
  questions: QuestionType[];
};

export type QuestionType = {
  title: string;
  answer: string;
  options: string[];
};

export type UserTypeType = "student" | "professor" | "";

export type MyInfoType = {
  name: string;
  email?: string;
  password?: string;
  userType?: string;
  classes?: string[];
  major?: string;
  studentId?: number;
};

export type AxiosRequestHeaders = Record<string, string>;

export interface CommonHeaderProperties extends HeadersDefaults {
  "Access-Control-Allow-Origin": string;
  Authorization: string;
}
