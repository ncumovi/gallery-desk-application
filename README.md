# vue-gallery

> A gallery based on vue

## Build Setup

### install dependencies
> npm install

###  serve with hot reload at localhost:8080
> npm run dev

###  build for production with minification
> npm run build

###  build for production and view the bundle analyzer report
> npm run build --report

## Gallery By React

one gallery project based on react

使用 *vue2.x* 构架的图片画廊应用-参照慕课网《React实战》课程对应的画廊应用实战项目 

## Demo & Examples

Live demo: https://ncumovi.github.io/gallery-react/


## Guideline

icon文件引用的是阿里巴巴矢量图库 

*link rel="stylesheet" href="//at.alicdn.com/t/font_510621_gkv0t0kevfs9k9.css"*

## thinking

  相比react的全程js操作（包括传递方法到子组件以及行内样式和class的相关传递和写法，基本都是字符串拼接的），个人觉得vue使用起来更得心应手。
  组件化开发，vue生命周期、数据传递等，用起来更方便。不过可能是因为我很少使用react，基本在平时开发工作中都是用vue的。
  vue也有一堆的坑，就拿数据传递来说吧，明明props上面有值，但是在template里面使用的时候却报错。
  可能是我生命周期理解不到位，使用不当，最后用了黑魔法--延时器解决了问题，尴尬ing...

## 求赞

你的赞是我升职加薪，迎娶白富美，走上人生巅峰的基石和动力。


## 注意

当在dist目录下面生成electron app时，在packjson里面定义版本号
```
"name": "beanSprout",
"version": "1.0.1"   //亲测1.0.0和1.0.1有用

```

这里的版本不能随便写，不然在用electron-packager打包成安装应用时会提示版本号不对，不符合规范等，导致打包失败
