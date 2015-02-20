module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'sinon-chai'],
    browsers: ['firefox_latest'],
    client: {
      captureConsole: true,
      mocha: { 'ui': 'tdd' }
    },
    basePath: '../',

    customLaunchers: {
      firefox_latest: {
        base: 'FirefoxNightly',
        prefs: {
          'dom.webcomponents.enabled': true
        }
      }
    },

    files: [
      'nope_modules/pipe-core/pipe.js',
      'pipe-contract.js',
      {
        pattern: 'test/worker.js',
        included: false
      },
      'test/test.js'
    ]
  });
};
