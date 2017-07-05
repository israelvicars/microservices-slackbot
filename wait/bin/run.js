const http = require('http');
const request = require('superagent');
const service = require('../server/service');

const server = http.createServer(service);

server.listen();

server.on('listening', () => {
  console.log(`WAIT is listening on ${server.address().port} in ${service.get('env')} mode.`);

  const announce = () => {
    const url = `http://127.0.0.1:3000/service/wait/${server.address().port}`;
    request.put(url, (err, res) => {
      if (err) {
        console.log(err);
        console.log("Error connecting to TINK");
        return;
      }
      console.log(res.body);
    });
  };

  announce();
  setInterval(announce, 15*1000);
});
