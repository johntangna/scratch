import { pick } from 'lodash-es';
import { DateConfig } from '../type';

/**
 * @desription 根据当前年月，计算当前总共天数
 */
export const getDays = (y: number, m: number): number => {
  const days = new Date(y, m, 0).getDate();
  return days;
};

/**
 * @desciption 根据年月和第一天，计算当前天是周几
 */
export const getDayOfWeek = (y: number, m: number, day = 1): number => {
  const week = new Date(y, m - 1, day).getDay();
  return week;
};

export const pickCalendarConfig = (data): DateConfig => {
  const dateData = pick(data, [
    '_id',
    'title',
    'text',
    'colspan',
    'color',
    'type',
    'properties',
    'id',
    'startTime',
    'endTime',
    'displayName',
    'userId',
  ]);
  return dateData;
};
