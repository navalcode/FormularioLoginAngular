// Run the same Angular/Jasmine suite with a browser connected manually.
module.exports = function(config) {
  require('./karma.conf')(config);
  const port = Number(process.env.FORM_TEST_PORT || 9878);
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Invalid FORM_TEST_PORT');
  config.set({hostname: '127.0.0.1', listenAddress: '127.0.0.1', port, browsers: [], singleRun: true, autoWatch: false, colors: false, reporters: ['progress'], client: {jasmine: {random: false}, captureConsole: false, clearContext: false}});
};
