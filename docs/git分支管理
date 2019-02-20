# Git分支管理

借鉴[AoneFlow](https://yq.aliyun.com/articles/573549)的分支管理策略，只采用三种分支类型，分别是:

- `master`: 主干分支，包含可以部署到生产环境中的代码;
- `feature`: 特性分支，包含特定功能集的代码，命名方式是`feature/*`;
- `release`: 发布分支，合并了一个或者多个特性分支的代码，命名方式是`release/*`;

## 操作步骤说明

一个功能开发开始的时候，先从`master`创建出对应的特性分支，比如`feature/chatFunc`。功能开发完成之后，
再从`master`创建出`master`创建出对应的发布分支，比如发布到测试环境的`release/test`分支，发布到预生产环境
的`release/pre-production`分支，发布到正式生产环境的`release/production`分支等等，然后把需要发布的特性
分支合并到对应的发布分支，发布完成并且验证通过之后，把发布到生产环境的发布分支合并回`master`，打上tag，流程
到此结束。

## 关于线上bug修复

可以直接从`master`创建出对应的发布分支(注意，其实此时的这个发布分支就相当于`git-flow`策略的`HotFix`分支)，
比如`release/fixOrderBug`，直接在发布分支上修改后，测试验证并且发布后，合并回`master`分支即可。
