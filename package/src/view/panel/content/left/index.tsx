import { h, Component } from 'preact';
import { observer } from '../../../..';
import DateConfigModel from '../../../../model/content/date/DateConfigModel';
import { ContentConfig } from '../../../../type';
import DeadLine from './DeadLine';
import Pendant from './Pendant';
import StatusFlag from './StatusFlag';

type IProps = {
  config: Exclude<ContentConfig, 'calendar'>;
  dateConfigModel: DateConfigModel
};

@observer
class Left extends Component<IProps> {
  render() {
    const { config: { pendant, deadline, statusFlag }, dateConfigModel } = this.props;
    return (
      <div className="left-content">
        {pendant && (
          <Pendant
            dateConfig={dateConfigModel.DateConfig}
            dateDataModel={dateConfigModel.DateDataComputed}
          />
        )}
        {deadline && <DeadLine />}
        {statusFlag && <StatusFlag />}
      </div>
    );
  }
}

export default Left;
