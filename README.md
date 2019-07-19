# sdk架构
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


## sdk包创建，构建，测试

1. 创建sdk包
```bash
npm run add:package --dirname=module-a
```
```
├── packages
    ├── module-a
        ├── example
            ├── example.js
            ├── example.umd.js
            ├── index.html
        ├── package
            ├── index.js
        ├── package.json (自动设置name, version, main, files, publishConfig字段配置)
        ├── README.md
```
package.json自动配置
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


2. 构建sdk包
```bash
npm run build --dirname=module-a
```
自动创建lib目录，并且生成commonjs2与umd规范的js文件
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


## 规范
  - changelog
  - 提交规范

## sdk文档
