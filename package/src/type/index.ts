import { StatusFlag, StatusFlagColor } from '../constant/constant';

export type BackgroundConfig = {
  background?: string;
  backgroundImage?: string;
  backgroundRepeat?: string;
  [key: string]: any;
};

export type HeaderConfig = {
  background?: {
    backgroundImage?: string;
    backgroundRepeat?: string;
    backgroundSize?: string;
    height?: string;
  };
  title?: string;
  text?: string;
};

export type CenterConfig = {
  title?: string;
  icon: {
    catalog: string;
    calendar: string;
  };
  buttonText?: string;
};

export type ContentConfig = {
  pendant?: {
    visible: boolean;
    [x: string]: any;
  };
  deadline?: {
    visible: boolean;
    [x: string]: any;
  };
  statusFlag?: {
    visible: boolean;
    [x: string]: any;
  };
  calendar?: {
    visible: boolean;
    [x: string]: any;
  };
};

export type DateTypeShow = {
  year: string;
  month: string;
  day: string;
};

// 日期矩阵中单个日期的基本配置
export type MatrixDate = {
  properties?: {
    noNeedRenderFlag: number;
    date: number;
    [propName: string]: any; // 支持自定义
  };
  plan: SingleDate
};

// 单日的配置
export type SingleDate = DateConfig[];

// 配置的基本选项
export type DateConfig = {
  _id?: string;
  title?: string;
  text?: string[];
  colspan?: boolean;
  color?: StatusFlagColor;
  type?: StatusFlag;
  properties?: Record<string, unknown>;
  id?: number;
  startTime?: string;
  endTime?:string;
  displayName?: string;
  userId?: number;
};
