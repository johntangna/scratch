import { action, computed, observable } from 'mobx';
import { getDateMatrix } from '../../../algorithm/date';
import { StatusFlagColor } from '../../../constant/constant';
import { DateTypeShow, SingleDate, DateConfig } from '../../../type';
import { getDayOfWeek, getDays } from '../../../utils/date';
import CalendarModel from '../../calendar/CalendarModel';

class DateConfigModel {
  @observable year = new Date().getFullYear();
  @observable month = (new Date().getMonth() + 1);
  @observable day = new Date().getDate();
  @observable dateDataAll: any[] = [];
  @observable eventList: DateConfig[] = [];
  constructor(data: DateTypeShow) {
    this.year = Number(data.year);
    this.month = Number(data.month);
    this.day = Number(data.day);
    this.initDateData();
  }

  /**
   * 在指定日期添加一个计划
   * 采用指定坐标进行插入计划
   * 当前日期表格已经设计成坐标点了，故采用指定坐标进行插入
   * @param xAxis 横坐标
   * @param yAxis 纵坐标
   */
  addOnePlan(xAxis: number, yAxis: number, plan: DateConfig) {
    this.dateDataAll[xAxis][yAxis].plan.push({
      ...plan,
    });
  }

  initDateData() {
    const currentWeek = getDayOfWeek(this.year, this.month);
    const days = getDays(this.year, this.month);
    this.dateDataAll = getDateMatrix(currentWeek, days, this.year, this.month);
    this.addOnePlan(2, 5, {
      color: StatusFlagColor.waiting,
      id: 12,
      startTime: '2018-04-4',
      endTime: '2018-04-15',
      displayName: '（主）小鹿',
      userId: 1,
    });
    this.addOnePlan(2, 5, {
      color: StatusFlagColor.cancel,
      id: 15,
      startTime: '2018-04-05',
      endTime: '2018-04-06',
      displayName: '（主）小鹿',
      userId: 2,
    });
    this.addOnePlan(2, 5, {
      color: StatusFlagColor.allow,
      id: 13,
      startTime: '2018-04-4',
      endTime: '2018-04-9',
      displayName: '（主）小鹿',
      userId: 3,
    });
    this.addOnePlan(2, 5, {
      color: StatusFlagColor.ready,
      id: 14,
      startTime: '2018-03-27',
      endTime: '2018-04-3',
      displayName: '（主）小鹿',
      userId: 4,
    });
    this.addOnePlan(2, 5, {
      color: StatusFlagColor.finished,
      id: 11,
      startTime: '2018-03-28',
      endTime: '2018-04-4',
      displayName: '（主）小鹿',
      userId: 5,
    });
    this.addOnePlan(1, 5, {
      color: StatusFlagColor.finished,
      id: 16,
      startTime: '2018-04-09',
      endTime: '2018-04-11',
      displayName: '（主）小鹿',
      userId: 6,
    });
    this.addOnePlan(1, 6, {
      color: StatusFlagColor.finished,
      id: 17,
      startTime: '2018-04-10',
      endTime: '2018-04-10',
      displayName: '（主）小鹿',
      userId: 7,
    });
    this.eventList = [
      {
        id: 12,
        startTime: '2022-12-4',
        endTime: '2022-12-15',
        displayName: '（主）王超',
        userId: 1,
      },
      {
        id: 15,
        startTime: '2022-12-05',
        endTime: '2022-12-06',
        displayName: '（次）王超',
        userId: 2,
      },
      {
        id: 13,
        startTime: '2022-11-4',
        endTime: '2022-12-9',
        displayName: '（延）王超',
        userId: 3,
      },
      {
        id: 14,
        startTime: '2022-11-27',
        endTime: '2022-12-3',
        displayName: '（准）王超',
        userId: 4,
      },
      {
        id: 11,
        startTime: '2022-12-8',
        endTime: '2022-12-14',
        displayName: '（驳）王超',
        userId: 3,
      },
      {
        id: 16,
        startTime: '2022-12-09',
        endTime: '2022-12-11',
        displayName: '（主）王超',
        userId: 6,
      },
      {
        id: 17,
        startTime: '2022-12-10',
        endTime: '2022-12-10',
        displayName: '（主）王超',
        userId: 7,
      },
    ];
  }

  @computed get DateDataComputed() {
    return this.dateDataAll;
  }

  @computed get DateConfig() {
    return {
      year: this.year.toString(),
      month: this.month.toString(),
      day: this.day.toString(),
    };
  }

  @action
  prevClick() {
    this.month === 12 ? this.year-- : '';
    this.month !== 1 ? this.month-- : this.month = 12;
  }

  @action
  nextClick() {
    this.month === 12 ? this.year++ : '';
    this.month !== 12 ? this.month++ : this.month = 1;
  }
}

export { DateConfigModel };
export default DateConfigModel;
