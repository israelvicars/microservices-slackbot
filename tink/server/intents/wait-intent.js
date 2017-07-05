const request = require('superagent');

module.exports.process = function process(intentData, registry, cb) {

  if (intentData.intent[0].value !== 'wait') {
    return cb(new Error(`Expected wait intent, got ${intentData.intent[0].value}`));
  }

  if (!intentData.ride) {
    return cb(new Error('Missing ride in wait intent'));
  }

  const service = registry.get('wait');
  if (!service) return cb(false, 'No service available');

  const serviceRoute = `http://${service.ip}:${service.port}/service/${ride}`;
  request.get(serviceRoute, (err, req, res) => {
    if (err || res.statusCode != 200 || !res.body.result) {
      console.log(err);

      return cb(false, new Error(`I don't yet know the wait time for ${intentData.ride[0].value}`));
    }
  });

}
