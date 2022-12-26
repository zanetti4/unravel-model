# unravel-model

## 前言
本项目借鉴 [模型拆解项目](https://blog.csdn.net/qq_39503511/article/details/115598219) 进行开发，仅用来学习如何应用 Three.js。

## 技术栈
``` bash
Vue 3.2.13: 构建项目，属于底层框架。
ES6: 较新的Javascript语法。
view-ui-plus: 基于 Vue.js 3 的企业级 UI 组件库。
less: 动态样式表语言。
less-loader: 将 less 编译为 css。
three: 基于原生WebGL封装运行的三维引擎。
tween.js: JavaScript 动画引擎。
```

## 路由设计及功能
- Home: 首页，展示直升机模型，通过左上角的开关，可以拆解、合并模型。

## 项目结构
``` bash
│  App.vue // 组件总入口
│  main.js // 项目的总入口
│  tree.txt // 项目结构
│      
├─components // 自定义组件
│      HandleModel.vue // 控制模型合并、拆解
│      
└─three
        UThree.js // three.js 类
```

## 心得体会&技术难点
> 这是我的第一个 three.js 项目，在学习了 three.js 基础知识后，参看模型拆解的博客，从中获取思路。因为博客没有贴出全部代码，在项目开发过程中难免遇到困难。我通过查看文档，和博客作者、技术群中的高手交流，解决了问题，对此我心怀感激！
1. 页面渲染不出辅助坐标轴。  
**解决办法：**  
```javascript
camera.position.set(30, 30, 30);
camera.lookAt( 0, 0, 0 );
```
需要设置摄像机的位置和方向。  
2. 加载 obj 模型时显示路径错误。  
**解决办法：**  
将模型文件放在 public 文件夹下，three 加载绝对地址，放在 src 里面会被打包的。  

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
