import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Event from './dragSourceComponents/event';
import Backward from './dragSourceComponents/backward';
import Forward from './dragSourceComponents/forward';

class EventWrap extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    const { event, draggable } = this.props;

    return (
      <div className="d-event-content">
        {!event.hasLast ? <Backward {...this.props} /> : null}
        <Event {...this.props} />
        {!event.hasNext ? <Forward {...this.props} /> : null}
      </div>
    );
  }
}

export default EventWrap;
