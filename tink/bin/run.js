const http = require('http');
const service = require('../server/service');
const SlackClient = require('../server/slack-client');
const WitClient = require('../server/wit-client');
const { slackToken, witToken } = require('../tokens');

const server = http.createServer(service);

const slackLogLevel = 'verbose';
const witClient = WitClient(witToken);
const serviceRegistry = service.get('serviceRegistry');
const tink = new SlackClient(slackToken, slackLogLevel, witClient, serviceRegistry);

tink.addAuthenticatedHandler(() => server.listen(3000));

server.on('listening', () => {
  console.log(`TINK is listening on ${server.address().port} in ${service.get('env')} mode.`);
});
