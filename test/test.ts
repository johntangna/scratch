const getDayOfWeek = (y: number, m: number, day = 1): number => {
  const week = new Date(y, m - 1, day).getDay();
  return week;
};
const getDateMatrix = (currentWeek, days, year, month) => {
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
        oneDimension[i][j] = 0;
        continue;
      }
      oneDimension[i][j] = {};
    }
  }
  return oneDimension;
};
console.info(getDateMatrix(2, 30, 2022, 11))
