module.exports = {
    devtool: 'source-map',

    entry:  {
        app : __dirname + "/src/index.jsx",
    },

    output: {
        path: __dirname + '/dist-local',
        filename: 'index.js'
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: /src/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['env', 'react']
                    }
                }
            },
            {
                test: /\.(html|js)$/,
                include: /src\/static/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    }
};
