import { observer as mobxObserver } from 'mobx-react';
import { h } from 'preact';
import 'preact/debug';
import SmartCalendar from './SmartCalendar';

export function observer<P>(props: P) {
  return mobxObserver(props as any);
}

export { SmartCalendar, h };

export default SmartCalendar;
