import { h, Component } from 'preact';
import { observer } from '../../..';
import { HeaderConfig } from '../../../type';

type IProps = {
  config: HeaderConfig;
};

@observer
class Header extends Component<IProps> {
  render() {
    const { config: { background, title, text } } = this.props;
    return (
      <div className="sc-header" style={background}>
        <div className="sc-title">
          <strong>{ title }</strong>
          <span>{ text }</span>
        </div>
      </div>
    );
  }
}

export default Header;
