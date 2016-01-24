const expect = require('expect');
const fs = require('fs');

describe('Testing on various Environment', function() {
  afterEach(function() {
    delete require.cache[require.resolve('../lib/index')];
  });

  it('It should return a config with default as true', function () {
    process.env.NODE_ENV = 'default';
    const lib = require('../lib/index');
    expect(lib.getEnvConfig).toEqual({ default: true, production: false, staging: false });
  });

  it('It should return a config with production as true', function () {
    process.env.NODE_ENV = 'production';
    const lib = require('../lib/index');
    expect(lib.getEnvConfig).toEqual({ default: false, production: true, staging: false });
  });

  it('It should return a config with staging as true', function () {
    process.env.NODE_ENV = 'staging';
    const lib = require('../lib/index');
    expect(lib.getEnvConfig).toEqual({ default: false, production: false, staging: true });
  });

  it('It should return a config with default as true because test.js is not found in webpack folder', function () {
    process.env.NODE_ENV = 'test';
    const lib = require('../lib/index');
    expect(lib.getEnvConfig).toEqual({ default: true, production: false, staging: false });
  });
});
