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
  hostAnswer: AnswersType[];
};

export type JoinProjectType = {
  classId: string;
  accessKey: string;
  position: string;
  answers: Array<AnswersType>;
};

export type AnswersType = {
  questionId: number;
  answer: number[];
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
  teamId: string;
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
  isSecret: false,
  isHostParticipating: true,
  questionIds: [0, 1, 2, 3],
  hostAnswer: [
    { questionId: 0, answer: [0] },
    { questionId: 1, answer: [0] },
    { questionId: 2, answer: [0, 1, 2, 3, 4, 5, 6, 7, 8] },
    { questionId: 3, answer: [0] },
  ],
};

export type AxiosRequestHeaders = Record<string, string>;

export interface CommonHeaderProperties extends HeadersDefaults {
  "Access-Control-Allow-Origin": string;
  Authorization: string;
}

export const questionLists = [
  {
    id: 0,
    title: "Coding Experience(year)",
    options: ["0~1", "1~3", "3~5", "5~10", "10+"],
    weight: 5,
    countScore: "same",
  },
  {
    id: 1,
    title: "How much time to spend per week?",
    options: ["0~5", "5~10", "10~15", "15~20", "20+"],
    weight: 5,
    countScore: "same",
  },
  {
    id: 2,
    title: "Preferred Date and Time",
    options: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    weight: 10,
    countScore: "same",
  },
  {
    id: 3,
    title: "Preferred Role",
    options: ["Leader", "Follower"],
    weight: 5,
    countScore: "different",
  },
];

export type UserContextType = {
  answer: (number | number[])[];
  name: string;
  positionIndex: number;
  user: string;
  _id: string;
};

export enum MatchingConditionId {
  MatchAll, // match all
  MatchAllLower, // match all lower condition
  MatchPE, // match preferred time and experience
  MatchPELower, // match preferred time and experience lower condition
  MatchPS, // match preferred time and time spend
  MatchPSLower, // match preferred time and time spend lower condition
  MatchES, // match experience and time spend
  MatchESLoswer, // match experience and time spend lower condition
  MatchS, // match time spend
  MatchSLoswer, // match time spend lower condition
  MatchP, // match preferred time
  MatchE, // match experience
  MatchELower, // match experience lower condition
  Random = -1,
}

export type TeamInfoType = {
  chat: string[];
  class: string;
  conditionId: MatchingConditionId;
  contextByUser: UserContextType[];
  dirtyMembers: string[];
  isDirty: boolean;
  leader: string;
  members: [];
  name: string;
  _id: string;
};
