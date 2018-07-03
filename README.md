## 使用前注意事项

1、直接使用 `cnpm`可能会导致依赖不正确。强烈建议给 `npm` 设置 taobao 的 registry。

`npm install --registry=https://registry.npm.taobao.org`

2、如果你遇到 `$t` 报错问题，先删除 `node_modules`文件夹后再重装依赖。

3、新建页面，需重新`npm run dev`才可以正常访问新建的页面。

4、`npm run dev`将会自动在浏览器打开页面，如未正常打开，请访问完整的路径`http:// localhost:8091/views/home/list.html`

## 主要功能

 1. 全局统一使用的模块`Lib.js`库
 2. 支持字体图标
 3. 构建时，增加对css打包的支持
 4. 提取公共模块
 5. 多页面可使用vue-router2路由
 6. 可自定义页面模块名，例如 http:// localhost:8091/`views`/home/list.html，`views`就是我们线上的模块名，1.0版只能固定的
 7. 支持二级目录，便于归类，1.0版本暂时仅支持一级目录
 8. 模块下静态文件可直接调用
 9. 发送ajax请求，使用`axios`库，简单封装了一个库，为了减少学习成本，封装参数基本与`JQ ajax`一致，如果不需要可直接删除
 10. 基于`webpack2`，更高的构建速度，包体积更小，全面支持`ES6 Modules`
 11. 热更新，效率提升神器呀
 12. 支持`Less`css预处理
 13. 获取多页面的url参数的方法
 14. 全局注册vue全局过滤器的方法

## Build Setup
clone到本地仓之后，自行`npm **`


``` bash
# 安装依赖
npm install

# 调试环境 serve with hot reload at localhost:8091
npm run dev

# 生产环境 build for production with minification
npm run build

```
本地默认访问端口为8091，需要更改的童鞋请到项目目录文件`config/index.js`修改。


## 目录结构
``` 
webpack
 |---build
 |---src
     |---assets    #资源
     |---css/common.css  #css
     |---font/    #字体图标
     |---js/common.js    #自己定义的全局通用事件
     |---js/conf.js    #项目的配置
     |---js/Lib.js    #暴露接口给组件调用
     |---js/vueFilter.js    #注册vue的全局过滤器	
 |---components 组件
     |---Button.vue  按钮组件
     |---hb-head.vue  head组件
|---views    #各个页面模块，模块名可以自定义哦！
     |---home    #一级目录
        |---list    #二级目录
             |---list.html
             |---list.js
             |---listApp.vue
     |---vuxDemo    #一级目录
        |---button    #二级目录
             |---button.html
             |---button.js
             |---buttonApp.vue	
        |---calendar    #二级目录
             |---calendar.html
             |---calendar.js
             |---calendarApp.vue		 
......

