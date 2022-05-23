const path = require('path');

module.exports = {
    mode: "development",
    entry: "./src/physics-engine.js",
  
    output: {
        filename: "physics-engine.js",
        path: path.resolve(__dirname, '../', 'test-build'),
    }
}