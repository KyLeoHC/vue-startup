# vue-startup

一个基于vue的示例项目，既是一个单页应用，也是一个多页应用。与此同时，也包含了一些项目的约束和规范。

## 开发

```bash
# 克隆项目
git clone https://github.com/KyLeoHC/vue-startup.git

# 安装依赖(如果不是为了更新依赖包，建议运行npm ci命令，确保依赖包的版本一致，尤其是测试和正式环境的打包)，尽量不要使用cnpm安装
npm i 或者 npm ci

# 启动服务
npm run dev
```

浏览器访问[http://localhost:8089/dev/demo/list](http://localhost:8089/dev/demo/list)

## 发布

```bash
# 构建打包开发环境
npm run build:dev

# 构建打包测试环境
npm run build:test

# 构建打包预生产环境
npm run build:pre

# 构建打包生产环境
npm run build:prod
```

## 其它有用的命令或者选项

```bash
# 构建打包完成后展示模块分析结果
npm run build:prod --report

# 检查代码格式
npm run lint

# 自动纠正代码格式
npm run lint -- --fix
```

## 目录结构说明

```
.
├── build: 构建配置文件目录
│   ├── plugins: 自定义插件目录(如果不想发布到npm的话)，就放置在这里面
│   │   ├── flexible: 移动端的自适应方案插件
│   │   └── omit-css-webpack-plugin: 抽离css插件
│   │   ......
├── config: 项目构建环境配置目录
│   ├── config.dev.js: 开发环境的配置文件
│   ├── config.pre.js: 预生产环境的配置文件
│   ├── config.production.js: 生产环境的配置文件
│   ├── config.test.js: 测试环境的配置文件
│   └── index.js: 基础配置文件
├── docs: 项目其它说明文档目录
├── src: 项目源码目录
│   ├── common: 项目全局通用代码目录(此目录下的通用代码是和本项目的业务息息相关的)
│   │   ├── env.js: 项目通用环境变量，比如请求的域名、静态资源访问路径等等
│   │   ├── http.js: 项目通用请求函数，封装一些通用请求参数或者头部处理等等
│   │   └── router.js: 项目通用页面跳转函数，可实现跨子项目跳转(注意，此router非vue-router)
│   ├── components: 项目全局通用组件目录
│   ├── directives: 项目全局通用指令目录
│   ├── lang: 项目全局通用国际化语言包目录
│   ├── mock: 项目全局通用mock数据目录(如果采用mock系统，则此目录可忽略不要，比如easy-mock)
│   ├── project: 项目主功能业务模块目录(可放置多个子项目，实现多页应用)
│   │   ├── demo: 子项目目录
│   │   │   ├── app.vue: 入口组件
│   │   │   ├── index.html: 入口html模板
│   │   │   ├── index.js: 入口启动文件
│   │   │   ├── store: vuex的数据管理目录(内部代码结构参考vuex官方推荐的目录结构即可)
│   │   │   ├── views: 子项目的vue视图代码目录
│   │   │   ├── router: 路由配置目录(子项目也可以不用路由，那么这个目录可忽略)
│   │   │   └── services: 子项目的服务代码目录(如果代码其它子项目可用，请将其挪到全局服务目录处)
│   │   └── demo2: 子项目目录2
│   │   ......
│   ├── services: 项目全局通用服务代码目录
│   ├── styles: 项目全局样式目录
│   │   ├── common.styl
│   │   ├── mobile.styl
│   │   ├── normalize.css
│   │   └── theme.styl
│   └── utils: 项目全局通用工具函数目录(此目录的通用代码是全部与业务逻辑解耦的，跨项目可通用)
└── static: 项目静态资源放置目录
    └── images: 项目图片资源放置目录
```

## 关于本项目

本项目可以作为一个参考项目提供基于vue+webpack的前端环境搭建思路，但是建议充分了解本项目的构建配置方式，
为的是后期可以根据公司业务的复杂度去进行高度定制化，或者根据所在团队成员的习惯进行改动。

## 其它规范文档

[Git分支管理](https://github.com/KyLeoHC/vue-startup/blob/master/docs/git%E5%88%86%E6%94%AF%E7%AE%A1%E7%90%86.md)
[Git提交规范](https://github.com/KyLeoHC/vue-startup/blob/master/docs/git%E6%8F%90%E4%BA%A4%E8%A7%84%E8%8C%83.md)

## License

[MIT License](https://github.com/KyLeoHC/vue-startup/blob/master/LICENSE)
