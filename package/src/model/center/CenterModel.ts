import { action, computed, observable } from 'mobx';
import { CenterConfig } from '../../type';

class CenterModel {
  @observable catalog: string;
  @observable calendar: string;
  constructor(center: CenterConfig) {
    const { icon } = center;
    this.catalog = icon.catalog;
    this.calendar = icon.calendar;
  }

  @computed get Catalog() {
    return this.catalog;
  }

  @computed get Calendar() {
    return this.calendar;
  }

  @action
  changeCatalog(catalog: string) {
    this.catalog = catalog;
  }

  @action
  changeCalendar(calendar: string) {
    this.calendar = calendar;
  }
}

export { CenterModel };
export default CenterModel;
