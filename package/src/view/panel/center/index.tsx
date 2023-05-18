import { h, Component } from 'preact';
import { observer } from '../../..';
import CenterModel from '../../../model/center/CenterModel';
import { CenterConfig } from '../../../type';

type IProps = {
  config: CenterConfig;
};

@observer
class Center extends Component<IProps> {
  centerModel: CenterModel;
  constructor(props) {
    super();
    const { config: { icon } } = props;
    this.centerModel = new CenterModel({
      icon,
    });
  }
  componentDidMount(): void {
    this.replaceSpecifyStr(this.centerModel.Calendar, 2);
  }
  errorImg(img: string) {
    console.warn(`请检查一下${img}文件名称，未找到.png或者.jpeg/.jpg的文件`);
  }
  replaceSpecifyStr(replaceStr: string, flag: number) {
    const result = replaceStr.indexOf('_active') !== -1 ? replaceStr.replace('_active', '') : `${replaceStr.split('.')[0]}_active.${replaceStr.split('.')[1]}`;
    switch (flag) {
      case 1:
        this.centerModel.changeCatalog(result);
        break;
      case 2:
        this.centerModel.changeCalendar(result);
        break;
      default:
        break;
    }
  }
  render() {
    const { config: { title, buttonText } } = this.props;
    return (
      <div className="sc-center">
        <strong>{ title }</strong>
        <div className="right">
          <div className="pandent">
            <img onClick={() => this.replaceSpecifyStr(this.centerModel.Catalog, 1)} onError={() => this.errorImg(this.centerModel.Catalog)} src={`static/${this.centerModel.Catalog}`} alt="类别" />
            <img onClick={() => this.replaceSpecifyStr(this.centerModel.Calendar, 2)} onError={() => this.errorImg(this.centerModel.calendar)} src={`static/${this.centerModel.calendar}`} alt="日历" />
          </div>
          <div className="operate">
            <span>{buttonText}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Center;
