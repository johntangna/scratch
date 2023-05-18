/* eslint-disable max-len */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Day from './dragTargetComponents/day';

class Week extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    const {
      eventList, lastEventsArr, resetEventLists, setHoverEventList, createNewEvent, deleteEvent, eventForm,
      onChangeTime, weekArr, setHoverState, clearDragEvent, draggable, popoverControl, dateType,
    } = this.props;
    return (
      <div className="w">
        {weekArr.map((dateData, index) => (
          <Day
            dateType={dateType}
            popoverControl={popoverControl}
            draggable={draggable}
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            dateData={dateData}
            lastEventsArr={lastEventsArr}
            eventList={eventList}
            onChangeTime={onChangeTime}
            setHoverState={setHoverState}
            clearDragEvent={clearDragEvent}
            resetEventLists={resetEventLists}
            createNewEvent={createNewEvent}
            setHoverEventList={setHoverEventList}
            deleteEvent={deleteEvent}
            eventForm={eventForm}
          />
        ))}
      </div>
    );
  }
}

export default Week;
