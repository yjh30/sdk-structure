# sdk架构
## sdk项目搭建
1. `lerna init --independent`初始化sdk项目
> `lerna init --independent`为独立模式（sdk包的版本独立），`lerna init --fixed` 为固定模式（sdk包的版本一致）
```bash
mkdir sdk-demo
cd sdk-demo
lerna init
```

2. 设置lerna包的管理目录
```json
"packages": [
  "packages/*"
]
```

3. sdk项目环境配置
  - 配置babel.config.js
  - 配置.eslintrc.js，代码本地提交未符合eslint规则将拒绝提交


## 创建、构建与发布sdk包

1. 单包创建，构建与发布
  - 单包创建命令：`npm run create:package --package=moduleName`
  - 单包构建命令：`npm run build --package=moduleName`
  - 单包发布命令：`lerna publish`

2. 整包创建，构建与发布
> 包名自动设置为项目根目录名
  - 整包创建命令：`npm run create:fullpackage`
  - 整包构建命令：`npm run build`
  - 整包发布命令：`lerna publish`

3. 构建commonjs2规范的sdk包的依赖处理
> sdk包构建时会防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖(external dependencies)，如下sdk包module-a源码引入sdk包module-b
```js
import moduleA from 'packages/module-b'
```
配置webpack externals，resolve.alias 最终打包成`require(module-b)`的引入处理，最后你需要处理module-a包packages.json peerDependencies，运行命令：`lerna add module-b --scope module-a --include-peer-dependencies`



## sdk包页面测试


## 规范
  - changelog
  - 提交规范

## sdk文档
