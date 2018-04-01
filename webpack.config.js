module.exports = {
    context: __dirname + '/app',
    entry: './app.js',
    output: {
        path: __dirname + '/dist/js',
        filename: 'bundle.js'
    },

    watch: true,
    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: 'inline-cheap-module-source-map',

    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules$/,
            query: {
                presets: ['es2015']
            }
        }]
    },

    devServer: {
        host: 'localhost',
        port: 3000,
        contentBase: __dirname + '/dist',
        open: true
    }
}