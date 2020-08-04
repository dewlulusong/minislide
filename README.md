###### 20200803解决

- step原本不对的问题.
- 原本缺少小数位数参数.
- 原本absolute-relative过多问题.
- 原本自带编译警告和错误. 
- 原本很多无用代码.
- 去除在app.json和page.json重复设置nav样式

###### 问题

- 正常思路很慢
  - catchscroll 和
  - bindscroll一样慢
- 不正常的思路试一下
  - capture-catchscroll 
    - 不生效
  - 触摸结束, 需要timeout
    - touchend 生效
    - 要拿位置
  - 动画结束, 先尝试这个
    - animationend 不生效
    - transitionend 不生效
  - 自定义组件
  - wxs响应事件
  - 循环timeout处理
- 绑定方式
  - bind
  - catch
  - mut-bind
  - capture-bind
  - capture-catch

###### 定时拿节点

- 在自定义组件或包含自定义组件的页面中，推荐使用 this.createSelectorQuery 来代替 wx.createSelectorQuery ，这样可以确保在正确的范围内选择节点。

###### 思路

- 也可以换个思路, 每0.5s才运行一次.
  - 自定义组件的机制中可以做一个定时器吗?
  - 似乎这个才是王道, 每0.5s
    - 才响应一次. 
    - 才对外发出一个事件. 
    - 如果值相同, 就什么都不做.
- wxs是另一个思路, 他在组件内输出.
  - 滚动时只是对外反馈事件.
- 从滚动本身找办法
  - 滚动速度, 速度小于某值后触发.
  - 滚动触发计数器, 逢5触发.
  - 核心因素: 如何保证最后一次被触发.
  - 因为在手机测试才有结果因此需要记录log.

