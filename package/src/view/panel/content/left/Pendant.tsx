import { h, Component } from 'preact';
import { observer } from '../../../..';
import { DateTypeShow, MatrixDate, SingleDate } from '../../../../type';
import Iconify from '../../../iconify/index';

type IProps = {
  dateConfig: DateTypeShow
  dateDataModel: any[]
};

@observer
class Pendant extends Component<IProps> {
  weekHeader(week) {
    const chineseNum = ['一', '二', '三', '四', '五', '六', '日'];
    return <div className="default_font_size week_gray soft_weight2 default_margin">{chineseNum[week]}</div>;
  }
  firstLevel(data: MatrixDate[]) {
    return (
      <div className="first_level flex flex_around flex_align_center">
        {
          data.map((item, index) => this.singleDateModel(item))
        }
      </div>
    );
  }
  singleDateModel(date: MatrixDate) {
    return (
      <div className="single_date default_font_size soft_weight default_margin text_center">
        { date.properties?.noNeedRenderFlag === 1 && this.renderDate(date)}
      </div>
    );
  }
  renderDate(date: MatrixDate) {
    return (
      <div className="date">
        <div className={date.properties?.currentDate ? 'current_date_active' : 'normal_date'}>{date.properties?.date}</div>
        <div className="status flex flex_around flex_align_center flex_warp">
          {
            date.plan.map((item, index) => <div className="single_status" style={{ background: item.color }} />)
          }
        </div>
      </div>
    );
  }
  render() {
    const { dateConfig, dateDataModel } = this.props;
    return (
      <div className="pendant">
        <div className="flex flex_between flex_align_center">
          <div className="soft_black soft_weight medium_font_size">
            <span>
              {dateConfig.month}
              月
            </span>
            <span style={{ marginLeft: '10px' }}>{dateConfig.year}</span>
          </div>
          <div className="soft_gray arrow">
            <Iconify iconName="teenyicons:arrow-left-small-solid" />
            <Iconify iconName="teenyicons:arrow-right-small-solid" />
          </div>
        </div>
        <div className="default_vertical_margin">
          <div className="weekHeader flex flex_around flex_align_center">
            {
              Array.from({ length: 7 }).map((item, index) => this.weekHeader(index))
            }
          </div>
          <div className="default_vertical_margin">
            {
              // eslint-disable-next-line max-len
              dateDataModel.map((item, index) => this.firstLevel(item))
            }
          </div>
        </div>

        <div className="soft_border" />
      </div>
    );
  }
}

export default Pendant;
