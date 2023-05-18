/* eslint-disable default-case */
/* eslint-disable max-len */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
// eslint-disable-next-line import/named
import { Types, TEMP_SHOW_ID } from './util/constant';
import Week from './components/week';
import './index.less';

@DragDropContext(HTML5Backend)
export default class DateContent extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      hoverDate: undefined,
      hoverEventId: undefined,
      targetDate: undefined,
      eventList: _.cloneDeep(props.eventList),
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    // eslint-disable-next-line react/destructuring-assignment
    if (!_.isEqual(nextProps.eventList, this.state.eventList)) {
      this.setState({
        eventList: _.cloneDeep(nextProps.eventList),
      });
    }
  }

  /**
   * 拖动的时候显示预览效果
   */
  setHoverEventList = data => {
    const { hoverDate, dragType, id, targetDate, dateType } = data;
    const { eventList } = this.state;

    const newEventList = [];
    const event = _.find(eventList, { id });
    const diff = event ? moment(hoverDate).valueOf() - moment(targetDate).valueOf() : '';
    const newStartTime = moment(moment(event.startTime).valueOf() + diff).format(dateType);
    const newEndTime = moment(moment(event.endTime).valueOf() + diff).format(dateType);
    const newRes = Object.assign({},
      event,
      {
        id: TEMP_SHOW_ID,
        startTime: newStartTime,
        endTime: newEndTime,
        _hide: false,
        _temp: true,
      });

    _.forEach(eventList, e => {
      let res;
      // eslint-disable-next-line default-case
      switch (dragType) {
        case Types.BACKWARD:
          res = e;
          if (e.id === id && moment(e.endTime).valueOf() >= moment(hoverDate).valueOf()) {
            // 拖拽预览的时候要计算时分秒
            const daysM = moment(moment(event.startTime).format('YYYY-MM-DD')).valueOf() - moment(hoverDate).valueOf();
            const hourMinutes = moment(event.startTime).valueOf() - daysM - moment(hoverDate).valueOf();
            const finalHoverDate = moment(moment(hoverDate).valueOf() + hourMinutes).format(dateType);
            res = Object.assign({}, e, { startTime: finalHoverDate });
          }
          break;
        case Types.FORWARD:
          res = e;
          if (e.id === id && moment(e.startTime).valueOf() <= moment(hoverDate).valueOf()) {
            // 拖拽预览的时候要计算时分秒
            const daysM = moment(moment(event.endTime).format('YYYY-MM-DD')).valueOf() - moment(hoverDate).valueOf();
            const hourMinutes = moment(event.endTime).valueOf() - daysM - moment(hoverDate).valueOf();
            const finalHoverDate = moment(moment(hoverDate).valueOf() + hourMinutes).format(dateType);
            res = Object.assign({}, e, { endTime: finalHoverDate });
          }
          break;
        case Types.EVENT:
          res = e;
          if (e.id === id && !_.find(eventList, { id: TEMP_SHOW_ID })) {
            newEventList.push(newRes);
          }
          if (e.id === TEMP_SHOW_ID && e._temp === true) {
            res = newRes;
          }
          break;
      }
      newEventList.push(res);
    });
    if (!_.isEqual(newEventList, eventList)) {
      this.setState({
        eventList: newEventList,
      });
    }
  };

  /**
   * 设置拖动时hover状态
   */
  setHoverState = data => {
    const { hoverDate, id, targetDate, dragType } = data;
    this.setState({
      hoverDate,
      hoverEventId: id,
      targetDate,
      dragType,
    });
  };

  /**
   * 将数组变成7个一组的，一行行渲染
   */
  toWeekDateArr = dateData => {
    const res = [];
    dateData.forEach((data, index) => {
      if (index % 7 === 0) {
        res.push([data]);
      } else {
        // eslint-disable-next-line no-mixed-operators
        res[(index - index % 7) / 7].push(data);
      }
    });
    return res;
  };

  /**
   * 计算hover状态，打上_hover标记
   */
  addHoverStatus = (dateData) => {
    const { eventList, dateType } = this.props;
    const { hoverDate, hoverEventId, targetDate, dragType } = this.state;
    if (!hoverEventId && !hoverDate) return dateData;
    const event = _.find(eventList, { id: hoverEventId });
    const diffStart = event ? moment(targetDate).valueOf() - moment(event.startTime).valueOf() : '';
    const dateMils = event ? moment(event.endTime).valueOf() - moment(event.startTime).valueOf() : '';
    let hoverStartTime;
    let hoverEndTime;

    switch (dragType) {
      case Types.EVENT:
        hoverStartTime = moment(moment(hoverDate).valueOf() - diffStart).format(dateType);
        hoverEndTime = moment(moment(hoverDate).valueOf() + dateMils - diffStart).format(dateType);
        break;
      case Types.BACKWARD:
        hoverStartTime = moment(hoverDate).format(dateType);
        hoverEndTime = event.endTime;
        break;
      case Types.FORWARD:
        hoverStartTime = event.startTime;
        hoverEndTime = moment(hoverDate).format(dateType);
        break;
      case Types.NEW:
        hoverStartTime = targetDate;
        hoverEndTime = hoverDate;
        if (moment(targetDate).valueOf() > moment(hoverDate).valueOf()) {
          hoverStartTime = hoverDate;
          hoverEndTime = targetDate;
        }
    }

    dateData.forEach(date => {
      if (moment(date.date).valueOf() >= moment(moment(hoverStartTime).format('YYYY-MM-DD')).valueOf()
        && moment(date.date).valueOf() <= moment(moment(hoverEndTime).format('YYYY-MM-DD')).valueOf()) {
        date._hover = true;
      }
    });
    return dateData;
  };

  /**
   * 隐藏被拖拽的事件
   */
  clearDragEvent = (id) => {
    const { eventList } = this.state;
    const newEventList = _.map(eventList, (e) => ({ ...e, _hide: e.id === id }));
    this.setState({
      eventList: newEventList,
    });
  };

  /**
   * 拖动态结束，还原状态
   */
  resetEventLists = () => {
    this.setState({
      // eslint-disable-next-line react/destructuring-assignment
      eventList: _.cloneDeep(this.props.eventList),
    });
  };

  render() {
    const {
      dateData, onChangeTime, createNewEvent, deleteEvent, eventForm, draggable, popoverControl, dateType,
    } = this.props;
    const { eventList } = this.state;
    const showData = this.addHoverStatus(JSON.parse(JSON.stringify(dateData)));

    // 这是个全局变量！
    const lastEventsArr = [];
    return (
      <div className="date-content">
        <div className="d-week-row" />
        <div className="d-content">
          {this.toWeekDateArr(showData).map((weekArr, index) => (
            <Week
              dateType={dateType}
              draggable={draggable}
              popoverControl={popoverControl}
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              weekArr={weekArr}
              eventList={eventList}
              lastEventsArr={lastEventsArr}
              onChangeTime={onChangeTime}
              setHoverState={this.setHoverState}
              clearDragEvent={this.clearDragEvent}
              resetEventLists={this.resetEventLists}
              setHoverEventList={this.setHoverEventList}
              createNewEvent={createNewEvent}
              deleteEvent={deleteEvent}
              eventForm={eventForm}
            />
          ))}
        </div>
      </div>
    );
  }
}
