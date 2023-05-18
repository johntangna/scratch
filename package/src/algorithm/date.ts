/**
 * 日期相关类的算法
 */

import { SingleDate } from '../type';
import { getDayOfWeek } from '../utils/date';

/**
 * 判断当前年月日是否等于当前天的年月日
 * @param k 当前日期的索引
 * @param year 待比对的年份
 * @param month 待比对的月份
 */
export const isCurrentDate = (k, year, month) => {
  const cd = new Date().getDate();
  const cy = new Date().getFullYear();
  const cm = new Date().getMonth() + 1;
  return (cd === k) && (cy === year) && (cm === month);
};

/**
 * 计算出日期数组矩阵
 * @param currentWeek 当前周几
 * @param days 总共的天数
 */
export const getDateMatrix = (currentWeek, days, year, month) => {
  let k = 0;
  const oneDimension: any[] = [];
  // 获取当前月的最后一天是周几
  const weekOfLastDay = getDayOfWeek(year, month, days);
  // 由于日期存放到二维数组当中，需要根据实际情况存放位置。要先加上当前周几的前几天，在除以7，可得到二维数组的最大横向数
  // 最大纵向数为7
  const horizalDoubleArrayDimension = Math.ceil(((currentWeek - 1) + days) / 7);
  for (let i = 0; i < horizalDoubleArrayDimension; i++) {
    oneDimension[i] = [];
    for (let j = 0; j < 7; j++) {
      /**
       * 将占位符置为0，方便后期渲染
       * 占位符指，当前位置不是日期的位置
       */
      if (
        (i === 0 && j < currentWeek - 1)
        || (i === horizalDoubleArrayDimension - 1 && j >= weekOfLastDay)
      ) {
        oneDimension[i][j] = {
          properties: {
            noNeedRenderFlag: 0,
          },
        };
      } else {
        k = k + 1;
        oneDimension[i][j] = {
          plan: [],
          properties: {
            noNeedRenderFlag: 1,
            date: k,
            currentDate: isCurrentDate(k, year, month),
          },
        };
      }
    }
  }
  return oneDimension;
};
