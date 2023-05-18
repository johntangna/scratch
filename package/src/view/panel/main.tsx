import { h, Component } from 'preact';
import { observer } from '../..';
import Header from './header/index';
import Center from './center/index';
import Content from './content/index';
import { HeaderConfig, CenterConfig, ContentConfig } from '../../type';

type IProps = {
  header: HeaderConfig;
  center: CenterConfig;
  content: ContentConfig;
};

@observer
class Main extends Component<IProps> {
  render() {
    const { header, center, content } = this.props;
    return (
      <div className="sc-main">
        <Header config={header} />
        <Center config={center} />
        <Content config={content} />
      </div>
    );
  }
}

export default Main;
