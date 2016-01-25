'use strict';

const appRoot = require('app-root-path');
const path = require('path');
const _ = require('lodash');
const ENV = process.env.NODE_ENV || 'default';
const chalk = require('chalk');
const errors = {
  noDefault: 'No \'default\' config found',
  noEnvConfig: 'No config found for environment ->',
};
let config;
let PATH_TO_CONFIG;

function combineConfigs(DEFAULT_CONFIG, ENV_CONFIG) {
  const FINAL_CONFIG = Object.assign({}, DEFAULT_CONFIG, ENV_CONFIG);
  return FINAL_CONFIG;
}

function getEnvConfig(DEFAULT_CONFIG, ENV_CONFIG_PATH) {
  try {
    const ENV_CONFIG = require(ENV_CONFIG_PATH);
    return combineConfigs(DEFAULT_CONFIG, ENV_CONFIG);
  } catch (e) {
    console.warn(chalk.yellow('WARNING:'), errors.noEnvConfig, chalk.green(ENV));
    return combineConfigs(DEFAULT_CONFIG, {});
  }
}

function getEnvConfigPath(DEFAULT_CONFIG) {
  if (_.get(config, 'fileMapping.'.concat(ENV))) {
    const ENV_CONFIG_PATH = path.join(PATH_TO_CONFIG, config.fileMapping[ENV]);
    return getEnvConfig(DEFAULT_CONFIG, ENV_CONFIG_PATH);
  }
  const ENV_CONFIG_PATH = path.join(PATH_TO_CONFIG, ENV);
  return getEnvConfig(DEFAULT_CONFIG, ENV_CONFIG_PATH);
}

function getDefaultConfig(pathToDefaultConfig) {
  try {
    const DEFAULT_CONFIG = require(pathToDefaultConfig);
    return getEnvConfigPath(DEFAULT_CONFIG);
  } catch (e) {
    const err = errors.noDefault.concat(' at ', pathToDefaultConfig, '.js');
    console.error(chalk.red(err));
    return {};
  }
}

function checkDefaultConfigMapping() {
  PATH_TO_CONFIG = path.join(path.resolve(config.context), 'webpack');
  if (_.get(config, 'fileMapping.default')) {
    return getDefaultConfig(path.join(PATH_TO_CONFIG, config.fileMapping.default));
  }
  return getDefaultConfig(path.join(PATH_TO_CONFIG, 'default'));
}

function init() {
  try {
    config = require(path.join(appRoot.path, 'easy.webpack.config'));
  } finally {
    const defaultWebpackConfig = {
      context: appRoot.path,
    };
    config = Object.assign({}, defaultWebpackConfig, config);
    return checkDefaultConfigMapping(config);
  }
}

module.exports = {
  getEnvConfig: init(),
};
