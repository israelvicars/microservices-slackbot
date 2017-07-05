const http = require('http');
const service = require('../server/service');

const server = http.createServer(service);

server.listen(3010);

server.on('listening', () => {
  console.log(`WAIT-TIME is listening on ${server.address().port} in ${service.get('env')} mode.`);
});
