/* eslint-disable import/extensions */
import { h, Component } from 'preact';
import moment from 'moment';
import _ from 'lodash';
import { observer } from '../../../..';
import { DateConfigModel } from '../../../../model/content/date/DateConfigModel';
import { ContentConfig, DateConfig } from '../../../../type';
import CustomForm from './form.jsx';
import Calendar from '../../../ui/index.jsx';

type IProps = {
  config: Pick<ContentConfig, 'calendar'>;
  dateConfigModel: DateConfigModel;
};

@observer
class Right extends Component<IProps> {
  eventIndex = 0;
  eventList: DateConfig[];

  constructor(props) {
    super();
    this.eventList = props.dateConfigModel.eventList;
  }
  onChangeTime = (id, newStartTime, newEndtime) => {
    const { eventList } = this;
    eventList.forEach(event => {
      if (event.id === id) {
        const addTimeMils = moment(newStartTime).valueOf() - moment(event.startTime).valueOf();
        event.startTime = newStartTime || newStartTime;
        event.endTime = newEndtime || moment(moment(event.endTime).valueOf() + addTimeMils).format('YYYY-MM-DD');
      }
    });
    this.eventList = JSON.parse(JSON.stringify(eventList));
  };

  deleteEvent = id => {
    const { eventList } = this;
    let newEventList = JSON.parse(JSON.stringify(eventList));
    newEventList = _.filter(newEventList, e => e.id !== id);
    this.eventList = newEventList;
  };

  createNewEvent = (startTime, endTime) => {
    const { eventList } = this;
    const newEventList = JSON.parse(JSON.stringify(eventList));
    newEventList.push({
      id: this.eventIndex++,
      startTime,
      endTime,
      displayName: '新建',
      userId: 3,
    });
    this.eventList = newEventList;
  };
  render() {
    const { config: { calendar } } = this.props;
    return (
      <div>
        {calendar && (
          <Calendar
            monthStr="2022-12"
            eventList={this.eventList}
            eventForm={(event, closePopover) => (
              <CustomForm
                event={event}
                closePopover={closePopover}
                onChangeTime={this.onChangeTime}
                deleteEvent={this.deleteEvent}
              />
            )}
            onChangeTime={this.onChangeTime}
            deleteEvent={this.deleteEvent}
            createNewEvent={this.createNewEvent}
          />
        )}
      </div>
    );
  }
}

export default Right;
