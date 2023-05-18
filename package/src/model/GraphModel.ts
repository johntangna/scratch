import { observable } from 'mobx';
import { Definition } from '../options';

class GraphModel {
  rootEl: HTMLElement;
  @observable width?: number;
  @observable height?: number;
  constructor(options: Definition) {
    const { container } = options;
    this.rootEl = container;
    if (!options.width) {
      options.width = container.getBoundingClientRect().width;
    }
    if (!options.height) {
      options.height = container.getBoundingClientRect().height;
    }
    this.width = options.width;
    this.height = options.height;
  }
}

export { GraphModel };
export default GraphModel;
