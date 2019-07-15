exports.config = {
  server: 'hub-cloud.browserstack.com',

  commonCapabilities: {
    name: 'parallel_test',
    build: 'cucumber-js-browserstack',
  },

  capabilities: [
    {
      browserName: 'chrome',
    },
    {
      browserName: 'firefox',
    },
    {
      browserName: 'safari',
    },
    {
      browserName: 'internet explorer',
      browserVersion: '10',
    },
  ],
};

// Code to support common capabilities
exports.config.capabilities.forEach(function(caps) {
  for (const i in exports.config.commonCapabilities) caps[i] = caps[i] || exports.config.commonCapabilities[i];
});