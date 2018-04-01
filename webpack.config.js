const debug = process.env.NODE_ENV !== "production";
const configuration = debug ?
    require('./webpack-debug.js') :
    require('./webpack-compile.js');
module.exports = configuration;
