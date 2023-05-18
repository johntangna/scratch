import { action, computed, observable } from 'mobx';
import { ContentConfig } from '../../type';

class ContentModel {
  @observable pendant;
  @observable deadline;
  @observable statusFlag;
  @observable calendar;
  constructor(content: ContentConfig) {
    const { pendant, deadline, statusFlag, calendar } = content;
    this.pendant = pendant;
    this.deadline = deadline;
    this.statusFlag = statusFlag;
    this.calendar = calendar;
  }

  @computed get Pendant() {
    return this.pendant;
  }

  @computed get Deadline() {
    return this.deadline;
  }

  @computed get StatusFlag() {
    return this.statusFlag;
  }

  @computed get Calendar() {
    return this.calendar;
  }

  @computed get LeftPanelConfig() {
    return {
      pendant: this.pendant,
      deadline: this.deadline,
      statusFlag: this.statusFlag,
    };
  }

  @computed get RightPanelConfig() {
    return {
      calendar: this.calendar,
    };
  }

  @action
  changePendant(pendant: boolean) {
    this.pendant = pendant;
  }

  @action
  changeDeadline(deadline: boolean) {
    this.deadline = deadline;
  }

  @action
  changeStatusFlag(statusFlag: boolean) {
    this.statusFlag = statusFlag;
  }

  @action
  changeCalendar(calendar: boolean) {
    this.calendar = calendar;
  }
}

export { ContentModel };
export default ContentModel;
