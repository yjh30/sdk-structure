# sdk架构
## sdk项目搭建
1. `lerna init --independent`初始化sdk项目
> `lerna init --independent`为独立模式（sdk包的版本独立），`lerna init --fixed` 为固定模式（sdk包的版本一致）
```bash
mkdir sdk-demo
cd sdk-demo
lerna init
```

2. 更新yarn与lerna配置
  - 设置yarn工作区
``` json
"workspaces": [
  "packages/*"
]
```
  - 设置sdk包的输出目录
```json
"packages": [
  "lib/*"
]
```

3. sdk项目环境配置
  - 配置babel.config.js
  - 配置.eslintrc.js，eslint负责规范sdk包源码目录


## 创建、构建与发布sdk包

1. 单包创建，构建与发布
  - 自动创建整包目录：`npm run create:package --package=module-a`
  - 构建命令：`npm run build --package=module-a`
  - 整包发布命令：`lerna publish`


2. 整包创建，构建与发布
> 包名自动设置为项目根目录名
  - 自动创建整包目录：`npm run create:fullpackage`
  - 构建命令：`npm run build`
  - 整包发布命令：`lerna publish`






## 页面测试
```bash
mkdir pages
mkdir pages/module-a
cd pages/module-a
yarn init
```

## 规范
  - 代码规范
  - changelog
  - 提交规范

## sdk文档


<!-- 
5. 规范
- 提交规范
  - [angular提交规范](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-guidelines)
  - 配置参见该[文档](https://github.com/commitizen/cz-conventional-changelog)
- 代码规范eslint
  - 安装包 `yarn add --dev husky eslint babel-eslint eslint-config-airbnb-base eslint-plugin-import lint-staged -W`
  - 配置.eslintrc.js
- 生成changelog
  - 安装包 `yarn add --dev conventional-changelog -W`
  - 不重写之前的log `node_modules/.bin/conventional-changelog -p angular -i CHANGELOG.md -s`
  - 重写之前的log `node_modules/.bin/conventional-changelog -p angular -i CHANGELOG.md -s -r 0` -->
