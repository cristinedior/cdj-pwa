const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            title: 'PWA Text Editor',
        }),
        new WebpackPwaManifest({
            name: 'Text Editor',
            short_name: 'Editor',
            description: 'A simple text editor',
            background_color: '#ffffff',
            theme_color: '#317EFB',
            fingerprints: false,
            inject: true,
            start_url: '/',
            publicPath: '/',
            icons: [
                {
                    src: path.resolve('src/images/logo.png'),
                    sizes: [96, 128, 192, 256, 384, 512],
                },
            ],
        }),
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
        }),
    ],
};
