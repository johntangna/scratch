# 事件描述

emmiter 是智慧日历内部的通讯中心，用来发布以及监听事件，以低耦合的方式完成实例间的交互

### 规范

`emit('namespace: eventName')`，用过 eventName 区分事件类型

- date
  日期点击触发
