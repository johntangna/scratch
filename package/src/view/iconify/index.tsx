import { h, Component } from 'preact';
import { Icon } from '@iconify/react';

type IProps = {
  iconName: string
};

class IconDiy extends Component<IProps> {
  render() {
    const { iconName } = this.props;
    return (
      <Icon icon={iconName} />
    );
  }
}

export default IconDiy;
