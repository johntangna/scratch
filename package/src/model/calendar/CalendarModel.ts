import { assign } from 'lodash-es';
import { observable } from 'mobx';
import { StatusFlag, StatusFlagColor } from '../../constant/constant';
import { DateConfig } from '../../type';
import { pickCalendarConfig } from '../../utils/date';
import { createUuid } from '../../utils/uuid';

class CalendarModel {
  _id = createUuid();
  @observable title = '';
  @observable text = [];
  @observable colspan = false;
  @observable color = StatusFlagColor.waiting;
  @observable type = StatusFlag.waiting;
  @observable properties: Record<string, any> = {};
  @observable id = 0;
  @observable startTime = '';
  @observable endTime = '';
  @observable displayName = '';
  @observable userId = 0;
  constructor(data: DateConfig) {
    this.initData(data);
  }
  initData(data) {
    if (!data.properties) {
      data.properties = {};
    }
    assign(this, pickCalendarConfig(data));
  }
}

export { CalendarModel };
export default CalendarModel;
