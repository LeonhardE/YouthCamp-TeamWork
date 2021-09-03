# 字节青训营大作业：幸运大转盘

* 使用React框架实现一个简单的转盘抽奖
* 参考demo: https://github.com/mykurisu/prize-react

## 主要工作

* 将RowItem修改为函数组件，并分离成单独文件
* 添加金币功能，每抽一次奖要消耗10金币，可以无限充值
* 添加中奖提醒窗口
* 使用Node.js和Express搭建后端，并在后端进行抽奖（根据中奖概率随机抽奖）
* 增加数据接口，从后端获取奖品内容与中奖概率
* 增加数据接口，从后端获取用户当前金币个数与中奖列表
* 搭建后台管理系统，可以编辑奖品内容与中奖概率

## 启动方法

* 进入主目录，npm/yarn install
* 进入server目录，npm/yarn install
* 返回主目录，npm/yarn start
* 上述命令将同时启动React应用和Express应用，React运行在localhost:3000, Express运行在localhost:5000

## 后续工作

* 优化UI，添加图片以及按钮动画效果
* 更多新功能欢迎贡献想法

## 效果展示

### 幸运大转盘

![roll_home](https://LeonhardE.github.io/images/roll_home.png)

### 后台管理系统

![roll_manage](https://LeonhardE.github.io/images/roll_manage.png)

## 团队构成

团队成员：曾宪欣 张丹妮 张天畅 丁逸敏

| 姓名   | 工作内容                                                     | 贡献率 |
| ------ | ------------------------------------------------------------ | ------ |
| 曾宪欣 | 使用React与Express搭建项目前后端基本框架，完成前端抽奖逻辑与后端数据接口 | 40%    |
| 丁逸敏 | 优化项目前端UI与后端接口，完成后台管理系统功能，可编辑奖品与中奖概率 | 30%    |
| 张丹妮 | 优化项目前端UI，完成项目奖品列表功能                         | 20%    |
| 张天畅 | 优化项目前端UI                                               | 10%    |

## 补充说明

* 项目contribution里一万多行、三万行和三百万行的增删是由于不小心上传了package-lock.json和node module文件夹所致，导致出现这种超出实际的代码量