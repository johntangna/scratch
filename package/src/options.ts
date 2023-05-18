/**
 * 整个项目中所有选项定义
 */
import { assign } from 'lodash-es';
import { BackgroundConfig, HeaderConfig, CenterConfig, ContentConfig } from './type';
import GraphModel from './model/GraphModel';

export const defaults = {
  background: false,
  textEdit: true,
};

export type Definition = {
  /**
   * 日历的容器
   * 不传宽高，默认全屏
   */
  container: HTMLElement;
  /**
   * 容器的宽度
   */
  width?: number;
  /**
   * 容器的高度
   */
  height?: number;
  /**
   * 容器的背景
   */
  background?: false | BackgroundConfig;
  /**
   * 头部配置
   */
  header: HeaderConfig;
  /**
   * 中间配置
   */
  center: CenterConfig;
  /**
   * 内容配置
   */
  content: ContentConfig;
};

/**
 * @param options 日历选项，用来做容错处理
 */
export function get(options: Definition) {
  const { container, width, height } = options;
  if (!container) {
    throw new Error('container参数无效哦');
  }
  if (typeof width === 'string' || typeof height === 'string') {
    throw new Error('width或者height不支持传入字符串，请传入数字');
  }

  return assign({}, defaults, options);
}
