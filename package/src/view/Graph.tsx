import { h, Component } from 'preact';
import { observer } from '..';
import GraphModel from '../model/GraphModel';
import * as Options from '../options';
import BackgroundOverlay from './overlay/BackgroundOverlay';
import Main from './panel/main';

type IProps = {
  options: Options.Definition;
  graphModel: GraphModel;
};
type ContainerStyle = {
  width?: string;
  height?: string
};

@observer
class Graph extends Component<IProps> {
  render() {
    const { options, graphModel } = this.props;
    const style: ContainerStyle = {};
    if (options.width) {
      style.width = `${graphModel.width}px`;
    }
    if (options.height) {
      style.height = `${graphModel.height}px`;
    }
    return (
      <div className="sc-graph" style={style}>
        <Main header={options.header} center={options.center} content={options.content} />
        {options.background && <BackgroundOverlay background={options.background} />}
      </div>
    );
  }
}

export default Graph;
