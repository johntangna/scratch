import { h, render } from 'preact';
import GraphModel from './model/GraphModel';
import * as Options from './options';
import Graph from './view/Graph';

export default class SmartCalendar {
  container: HTMLElement;
  options: Options.Definition;
  graphModel: GraphModel;
  constructor(options: Options.Definition) {
    options = Options.get(options);
    this.options = options;
    this.container = options.container;
    this.graphModel = new GraphModel({
      ...options,
    });
  }
  renderRawData() {
    render((
      <Graph
        options={this.options}
        graphModel={this.graphModel}
      />
    ), this.container);
  }
  render() {
    this.renderRawData();
  }
}
