import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { DragSource } from 'react-dnd';
import { Types } from '../../util/constant';
import { forwardSource, sourceCollect } from './sourceConfig';

@DragSource(Types.FORWARD, forwardSource, sourceCollect)
class Forward extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
  };

  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.connectDragPreview(getEmptyImage(), { captureDraggingState: true });
  }

  render() {
    const { connectDragSource, draggable } = this.props;
    if (!draggable) {
      return (
        <div className="d-forward" />
      );
    }
    return connectDragSource(
      <div className="d-forward draggable" />,
    );
  }
}

export default Forward;
