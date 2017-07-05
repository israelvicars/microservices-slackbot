const express = require('express');
const service = express();
const Themeparks = require('themeparks');

service.get('/service/rides/:park', (req, res, next) => {
  const Park = Themeparks.Parks[req.params.park];
  const park = new Park();

  park.GetWaitTimes().then(rides => {
    const result = rides.map(({ id, name }) => ({ id, name }));
    res.json({ result });
  }, console.error);
});

service.get('/service/ridenames/:park', (req, res, next) => {
  const Park = Themeparks.Parks[req.params.park];
  const park = new Park();

  park.GetWaitTimes().then(rides => {
    const result = rides.map(({ name }) => name);
    res.json({ result });
  }, console.error);
});

module.exports = service;
