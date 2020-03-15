// 插件
const Path = require('path');

// 参数
const getProjectPath = Path.resolve;
const PROJECT_PATH = getProjectPath();
const CLI_PATH = Path.resolve(__dirname, '../../');

function getAbsolutePath(path = '') {
  return Path.join(CLI_PATH, path);
}

function getModuleAbsolutePath(name = '') {
  return require.resolve(name);
}

module.exports = {
  CLI_PATH,
  PROJECT_PATH,
  getAbsolutePath,
  getProjectPath,
  getModuleAbsolutePath
};
