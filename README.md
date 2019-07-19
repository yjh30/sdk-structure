[TOC]

# sdk架构详述
## 目标

## sdk项目搭建
1. `lerna init --independent`初始化项目
> `lerna init --independent`为独立模式（sdk包发布的版本独立），`lerna init --fixed` 为固定模式（sdk包发布的版本一致）
```bash
mkdir sdk-demo
cd sdk-demo
lerna init
```
```
├── sdk-demo
    ├── packages
    ├── package.json
    ├── lerna.json
```

2. 设置lerna包的管理目录(修改lerna.json)
```json
{
  "packages": [
    "packages/*"
  ]
}
```

3. 项目配置
  - .gitignore
  - README.md
  - 配置babel.config.js
  - 配置.eslintrc.js，文件(过滤*min.js文件)本地提交未符合eslint规则将拒绝提交
  - 构建命令目录bin-script
```
├── sdk-demo
    ├── packages
    ├── package.json
    ├── lerna.json
    ├── .gitignore
    ├── babel.config.js
    ├── .eslintrc.js
    ├── bin-script
        ├── add 包含创建sdk包脚本
        ├── build 包含构建sdk包脚本
        ├── dev 包含测试sdk包脚本
```


## sdk单包创建，构建，测试

1. 创建sdk包
- 命令
```bash
npm run add:package --dirname=module-a
```
```
├── packages
    ├── module-a
        ├── example
            ├── example.js (测试commonjs2规范的sdk包的入口文件)
            ├── example.umd.js (测试umd规范的sdk包的入口文件)
            ├── index.html
        ├── package
            ├── index.js (构建sdk包的入口文件)
        ├── package.json (自动设置name, version, main, files, publishConfig字段配置)
        ├── README.md
```
- package.json自动配置详解
```json
{
  "name": "@esign/module-a",
  "version": "1.0.0",
  "description": "",
  "main": "lib/module-a.runtime.min.js",
  "repository": "",
  "author": "",
  "license": "MIT",
  "files": [
    "package.json",
    "lib/"
  ],
  "publishConfig": {
    "registry": "http://118.31.173.195:4873"
  }
}

```
- 安装依赖包
```bash
lerna add --dev @esign/module-b --scope=@esign/module-a
```

2. 构建sdk包
```bash
npm run build --dirname=module-a
```
自动创建lib目录，并且生成运行时commonjs2与umd规范的输出文件，package.json main字段默认指定运行时commonjs2规范文件module-a.runtime.min.js，umd文件module-a.min.js目前通过oss-browser手动上传到阿里云，oss账户见[wiki](http://wiki.timevale.cn:8081/pages/viewpage.action?pageId=31916068)
```
├── packages
    ├── module-a
        ├── example
            ├── example.js
            ├── example.umd.js
            ├── index.html
        ├── lib
            ├── module-a.min.js (umd)
            ├── module-a.runtime.min.js (commonjs2)
        ├── package
            ├── index.js
        ├── package.json (自动设置name, version, main, files, publishConfig字段配置)
        ├── README.md
```

3. 测试sdk包
- 测试运行时sdk包，example.js
```js
import moduleA from '../lib/module-a.min';

moduleA();
```

- 测试umd sdk包，example.umd.js
```js
console.log(window.esignModuleA);
window.esignModuleA();
```

- 命令
```bash
npm run dev --dirname=module-a
```
将自动在浏览器打开一个html标签页，运行example.js与example.umd.js文件代码


## 整包创建，构建，测试
1. 整包自动创建
整包的创建是基于单包创建而自动创建的，只要通过`npm run add:package --dirname=xxx`创建单包，那么将会在packages目录下自动建立整包目录；整包的目录名跟sdk项目目录名保持一致， 例如：通过命令`npm run add:package --dirname=module-a`，`npm run add:package --dirname=module-b` 创建了两个单包，那么整包目录如下：
```
├── packages
    ├── sdk-demko
        ├── example
            ├── example.js
            ├── example.umd.js
            ├── index.html
        ├── package
            ├── index.js
        ├── package.json (自动设置name, version, main, files, publishConfig字段配置)
        ├── README.md
```

- 整包sdk自动生成的源码入口文件代码
```js
/* eslint-disable */

import moduleA from '@esign/module-a';
import moduleB from '@esign/module-b';

exports.moduleA = moduleA;
exports.moduleB = moduleB;

export default {
  moduleA,
  moduleB,
};
```
- package.json自动将会自动设置单包依赖
```json
{
  "dependencies": {
    "@esign/module-a": "^1.0.0",
    "@esign/module-b": "^1.0.0"
  }
}
```

2. 整包构建
> 构建命令未带--dirname参数，其他同单包构建流程
```bash
npm run build
```

3. 整包测试
> 测试命令未带--dirname参数，其他同单包测试流程
```bash
npm run dev
```


## 规范规划
  - changelog
  - 提交规范

## sdk文档规划
