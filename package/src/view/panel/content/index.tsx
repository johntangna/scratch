import { h, Component } from 'preact';
import { observer } from '../../..';
import ContentModel from '../../../model/content/ContentModel';
import DateConfigModel from '../../../model/content/date/DateConfigModel';
import { ContentConfig } from '../../../type';
import Left from './left/index';
import Right from './right/index';

type IProps = {
  config: ContentConfig;
};

@observer
class Content extends Component<IProps> {
  content: ContentModel;
  dateConfigModel: DateConfigModel;
  constructor(props) {
    super();
    const { config } = props;
    this.content = new ContentModel({
      ...config,
    });
    this.dateConfigModel = new DateConfigModel({
      year: new Date().getFullYear().toString(),
      month: (new Date().getMonth() + 1).toString(),
      day: new Date().getDate().toString(),
    });
  }
  render() {
    return (
      <div className="sc-content">
        <div className="left">
          <Left config={this.content.LeftPanelConfig} dateConfigModel={this.dateConfigModel} />
        </div>
        <div className="right">
          <Right
            config={this.content.RightPanelConfig}
            dateConfigModel={this.dateConfigModel}
          />
        </div>
      </div>
    );
  }
}

export default Content;
