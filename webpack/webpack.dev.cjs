const path = require('path');

module.exports = {
    mode: "development",
    entry: {
        engine: "./src/physics-engine.js",
        sim: "./src/simulator.js",
    },
    devServer: {
        static: './app-dev'
    },

    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '../app-dev', 'build'),
        clean: true,
    },
}