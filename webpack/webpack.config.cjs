const path = require('path');

module.exports = {
    mode: "production",
    entry: "./src/physics-engine.js",
  
    output: {
        filename: "physics-engine.js",
        path: path.resolve(__dirname, '../', 'build'),
    }
}