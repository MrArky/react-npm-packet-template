# 一个用于 React 组件打包的 webpack 配置

## 开始
**webpack.config.ts** 文件，在这个文件中配置了多入口：
``` node
//webpack 打包时js的入口
entry: {
    view: {
        import: './src/index1.tsx',
        filename: 'index.js'
    },
    pub: {
        import: './src/index.tsx',
        filename: './../lib/index.js'
    }
},
```
`view` 配置用于 `build` 输出，输出在根目录 `dist` 中；

`pub` 配置打包是输出，输出在根目录 `lib` 中，最终上传的包就是这个目录内容。

针对不同的组件包，可能需要定义对应的名字：
``` node
output: {
    path: path.resolve(__dirname, 'dist'),
    //打包后js名称，支持路径+名称
    // filename: 'index.js',
    //每次打包前清空文件
    clean: true,
    // 发布到npm库的相关信息
    // name是发布到npm时的库名，别人安装就是安装它
    // type是暴露库的形式，umd就表示别人可以在所有模块定义下引入这个库
    // 比如CommonJs AMD 和全局变量的形式
    // export用来指定哪一个导出应该被暴露为一个库
    // 'default'就是我们默认导出的库
    library: {
        name: 'react-npm-packet-template',
        type: 'umd',
        export: 'default'
    },
},
```
即 `library` 中的 `name`。
**package.json** 文件定义包信息：
``` json
{
  "name": "react-npm-packet-template",
  "version": "1.0.3",
  "description": "测试组件开发，这可以做一个模板",
  "main": "lib/index.js",
  "files": [
    "lib"
  ],
  "keywords": [],
  "author": "",
  "license": "ISC",
}
```
- `name` 与 **webpack.config.ts** 文件 `library` 中的 `name` 一致；
- `version` 为版本号，每次上传的版本号不能相同；
- `description` 为描述；
- `main` 为入口js；
- `files` 为需要上传文件目录；
## 组件定义
组件定义不要求位置，只需要在打包时在 `src/index.tsx` 输出即可：
``` jsx
import TestComponent from './components/TestComponent'
export default TestComponent;
```

**注意：这是一个简单脚手架，如果需要维护多个组件，并支持组件按需引入，需要做少量自定义配置，这只提供了基础打包流程。**
