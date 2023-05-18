import { h, Component } from 'preact';
import { BackgroundConfig } from '../../type';

/**
 * 背景配置
 * @example
 *  backgroundImage:
 */

type IProps = {
  background: BackgroundConfig
};

export default class BackgroundOverlay extends Component<IProps> {
  render() {
    // eslint-disable-next-line no-debugger
    const { background } = this.props;
    return (
      <div className="sc-background">
        <div style={background} className="sc-background-area" />
      </div>
    );
  }
}
