# vue-startup

一个基于vue的示例项目，既是一个单页应用，也是一个多页应用。与此同时，也包含了一些项目的约束和规范。

## 开发

```bash
# 克隆项目
git clone https://github.com/KyLeoHC/vue-startup.git

# 安装依赖(如果不是为了更新依赖包，建议运行npm ci命令，确保依赖包的版本一致，尤其是测试和正式环境的打包)
npm i 或者 npm ci

# 使用淘宝镜像
npm install --registry=https://registry.npm.taobao.org

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

# 运行ts的类型检查
npm run type-check

# 运行ts的类型检查并且监控文件变化
npm run type-check:watch

# 检查JS或者html模板代码格式
npm run lint

# 自动纠正JS或者html模板代码格式
npm run lint -- --fix

# 检查css/scss样式代码格式
npm run stylelint

# 自动纠正css/scss样式代码格式
npm run stylelint -- --fix
```

## 目录结构说明

```
.
├── build: 构建配置文件目录
│   ├── loaders: 自定义loader放置的目录
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
│   │   ├── env.ts: 项目通用环境变量，比如请求的域名、静态资源访问路径等等
│   │   ├── api.ts: 第三方页面url以及后端接口url统一存放处
│   │   ├── http.ts: 项目通用请求函数，封装一些通用请求参数或者头部处理等等
│   │   └── router.ts: 项目通用页面跳转函数，可实现跨子项目跳转(注意，此router非vue-router)
│   ├── components: 项目全局通用组件目录
│   ├── directives: 项目全局通用指令目录
│   ├── lang: 项目全局通用国际化语言包目录
│   ├── mock: 项目全局通用mock数据目录(如果采用mock系统，则此目录可忽略不要，比如easy-mock)
│   ├── project: 项目主功能业务模块目录(可放置多个子项目，实现多页应用)
│   │   ├── demo: 子项目目录
│   │   │   ├── app.vue: 入口组件
│   │   │   ├── app.ts: 入口组件的script部分ts代码
│   │   │   ├── index.html: 入口html模板
│   │   │   ├── index.ts: 入口启动文件
│   │   │   ├── components: 当前子项目内公用的组件，如果其它子项目也可用，请把目标组件转移到全局组件目录
│   │   │   ├── store: vuex的数据管理目录(内部代码结构参考vuex官方推荐的目录结构即可)
│   │   │   ├── views: 子项目的vue视图代码目录
│   │   │   ├── router: 路由配置目录(子项目也可以不用路由，那么这个目录可忽略)
│   │   │   └── services: 子项目的服务代码目录(如果代码其它子项目可用，请将其挪到全局服务目录处)
│   │   └── demo2: 子项目目录2
│   │   ......
│   ├── services: 项目全局通用服务代码目录
│   ├── styles: 项目全局样式目录
│   │   ├── common.scss
│   │   ├── normalize.css
│   │   └── theme.scss
│   └── utils: 项目全局通用工具函数目录(此目录的通用代码是全部与业务逻辑解耦的，跨项目可通用)
└── static: 项目静态资源放置目录
    └── images: 项目图片资源放置目录
```

## 一些额外说明

1. `services`目录的是各种服务代码，一个服务包括了数据获取、数据缓存、数据转换、相关业务处理等逻辑；

2. `common`和`utils`两个目录有其相似的地方，都是一些全局通用函数或者工具函数，不同之处在于`common`目录的代码是带有当前项目业务性质的，跨项目不一定通用；

3. 关于API数据模型的定义，如果我们期望统一处理后端的异常空数据(比如某个字段应该在没有数据的情况下返回空数组`[]`，但是实际却返回了`null`)，这种
情况下我们会考虑使用`class`去定义数据模型，在`constructor`里取值判断再赋值或者使用`get`方法返回数据时处理，这里需要明确一点，在ts中，`class`会
输出实际的代码，与此同时，由于我们也对后端返回的JSON数据又重新包装处理了一次，对内存占用和性能也带来了些影响(尤其数据量大的情况下)。所以，这里并不倡导统一使
用`class`定义类型，对于一些不是很有必要统一处理空数据异常的，我们使用`interface`定义就好(`interface`不会输出任何代码，仅仅在开发时存在)，并且对一些可能
空值的字段表明`null`或者`undefined`类型，让ts编译器提醒数据使用方此字段可能是空，让使用方加入空数据处理逻辑就好；

4. 由于本项目的构建是基于babel7对ts的支持去实现，需要单独运行tsc命令去执行ts类型检查，但是由于目前ts的编译器本身是无法识别vue单文件组件里面的script代码，
所以本项目所有vue组件的ts代码全部需要抽离出单独ts代码文件，再通过src属性引入。另外，babel7对于ts的支持并不是完美的，但是总体用起来问题不大，参阅
[链接](https://blogs.msdn.microsoft.com/typescript/2018/08/27/typescript-and-babel-7/)。

## 关于本项目

本项目可以作为一个参考项目提供基于typescript+vue+webpack的前端环境搭建思路，但是建议充分了解本项目的构建配置方式，
为的是后期可以根据公司业务的复杂度去进行高度定制化，或者根据所在团队成员的习惯进行改动。

## 其它规范文档

- [Git分支管理](https://github.com/KyLeoHC/vue-startup/blob/master/docs/git%E5%88%86%E6%94%AF%E7%AE%A1%E7%90%86.md)
- [Git提交规范](https://github.com/KyLeoHC/vue-startup/blob/master/docs/git%E6%8F%90%E4%BA%A4%E8%A7%84%E8%8C%83.md)

## License

[MIT License](https://github.com/KyLeoHC/vue-startup/blob/master/LICENSE)
