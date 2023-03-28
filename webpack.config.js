const path = require('path');

module.exports = {
    entry: ['./src/public/js/script.js', './src/public/stylesheets/style.css'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './src/public/js/')
    },
    watch: true,
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
};
