SmartCalendar是用来智能化推送通知的插件，本插件采用日历的表现形式，易于理解以及操作

## 特性

- 😀 交互性友善

- 🔑 插拔式开发

- 💨 延展性适当

## 使用

### 安装

```sh
# npm
pnpm install smartcalendar --save

# yarn
yarn add smartcalendar --save
```

### 代码

```js
// 创建容器
<div id="container"></div>
const smartCalendar = new SmartCalendar({
  container: document.querySelector("#container"),
  width: 700,
  height: 600
})
smartCalendar.initial()
smartCalendar.render()
```