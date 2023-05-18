/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { DragSource } from 'react-dnd';
import { backwardSource, sourceCollect } from './sourceConfig';
import { Types } from '../../util/constant';

@DragSource(Types.BACKWARD, backwardSource, sourceCollect)
class Backward extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
  };

  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage(), { captureDraggingState: true });
  }

  render() {
    const { connectDragSource, draggable } = this.props;
    if (!draggable) {
      return (
        <div className="d-backward" />
      );
    }
    return connectDragSource(
      <div className="d-backward draggable" />,
    );
  }
}

export default Backward;
