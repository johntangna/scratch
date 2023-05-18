export enum StatusFlagColor {
  waiting = '#f88065',
  ready = '#1d85e8',
  allow = '#fad168',
  finished = '#7cc8b3',
  cancel = '#c3cad3'
}

export enum StatusFlag {
  waiting,
  ready,
  allow,
  finished,
  cancel
}

export const MONTH_TYPE = {
  LAST_MONTH: -1,
  THIS_MONTH: 0,
  NEXT_MONTH: 1,
};

export const EVENT_CLASS_NAME = {
  0: 'e-blue',
  1: 'e-green',
  2: 'e-light-green',
  3: 'e-orange',
};

export const HeaderText = [
  '周日', '周一', '周二', '周三', '周四', '周五', '周六',
];
