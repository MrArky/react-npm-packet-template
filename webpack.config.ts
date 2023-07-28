import webpack = require("webpack");

const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
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
    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: /\.css$/i,
                        use: ["style-loader", "css-loader"],
                    },
                    {
                        test: /\.less$/i,
                        use: ['style-loader', 'css-loader', 'less-loader'],
                    },
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            //当加载的图片，小于limit时，会将图片编译成base64字符串形式
                            //当加载的图片，大于limit时，需要使用file-loader模块进行加载
                            limit: 15000,
                            name: 'img/[name].[hash:8].[ext]',
                        }
                    }
                ]
            },
            {
                test: /\.(js|jsx|ts|tsx)$/,
                //打包时ES6+转换排除node_modules依赖
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-flow', '@babel/preset-typescript']
                    }
                }
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: "./src/index.html"
        }),
        // new MiniCssExtractPlugin({
        //     // 因为我们在文件中引入就是manyin-npm-packege-template.css
        //     // 所以在打包后，也用这个名字，以免引入失败
        //     filename: 'manyin-npm-packege-template.css'
        // }),
        new webpack.DefinePlugin({
            __DEV__: true,
            __PROFILE__: true,
            __EXPERIMENTAL__: true,
            __UMD__: true,
        })
    ],
    devServer: {
        watchFiles: ['src/**/*', 'public/**/*'],
        compress: true,
        port: 9000,
        open: true,//自动打开浏览器
        client: {
            overlay: {
                errors: true,
                warnings: false,
            },
        },
    },
    devtool: 'source-map',
    mode: 'development',
    resolve: {
        alias: {
            '@/': '/src/',
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    // // 压缩和优化的相关配置都写在optimization里
    // optimization: {
    //     minimizer: [
    //         new CssMinimizaerPlugin()
    //     ]
    // },
}
