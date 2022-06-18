const path = require('path');

module.exports = {
    mode: "development",
    entry: "./src/physics-engine.js",
    devServer: {
        static: './build'
    },

    output: {
        filename: "physics-engine.js",
        path: path.resolve(__dirname, '../', 'build'),
    },
}