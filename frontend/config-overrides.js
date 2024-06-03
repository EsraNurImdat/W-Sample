const path = require('path');
const chokidar = require('chokidar');

module.exports = function override(config, env) {
  if (env === 'development') {
    const watchOptions = {
      ignored: /node_modules/,
      persistent: true,
      ignoreInitial: true,
    };

    chokidar.watch(path.resolve(__dirname, 'src'), watchOptions);
    chokidar.watch(path.resolve(__dirname, 'public'), watchOptions);
  }
  return config;
};
