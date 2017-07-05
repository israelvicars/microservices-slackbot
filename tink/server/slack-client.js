const { CLIENT_EVENTS, RtmClient, RTM_EVENTS } = require('@slack/client');

class SlackClient {
  constructor(token, logLevel, nlpClient, serviceRegistry) {
    this.nlp = nlpClient;
    this.registry = serviceRegistry;
    this.rtm = new RtmClient(token, { logLevel });
    this.addAuthenticatedHandler(this.handleOnAuthenticated);
    this.rtm.on(RTM_EVENTS.MESSAGE, message => this.handleOnMessage(message));
    this.rtm.start();
  }

  addAuthenticatedHandler(handler) {
    this.rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, handler);
  }

  handleOnAuthenticated(rtmStartData) {
    console.log(`Logged in as ${rtmStartData.self.name} of ${rtmStartData.team.name}, but not yet connected to a channel.`);
  }

  handleOnMessage(message){
    if (message.text.toLowerCase().includes('tink')) {
      this.nlp.ask(message.text, (err, res) => {
        if (err) {
          console.log(err);
          return;
        }

        try {
          if (!res.intent || !res.intent[0] || !res.intent[0].value) {
            throw new Error('Could not extract intent.');
          }

          const intent = require(`./intents/${res.intent[0].value}`);

          intent.process(res, this.registry, (err, res) => {
            if (err) {
              console.log(error.message);
              return;
            }
            return rtm.sendMessage(response, message.channel);
          })
        } catch(err) {
          console.log(err);
          console.log(res);
          this.rtm.sendMessage('Sorry, I don\'t know what you are referring to.');
        }

        if (!res.intent) {
          return this.rtm.sendMessage('I\'ll have to get back to you on that one.', message.channel);
        } else if(res.intent[0].value == 'time' && res.location) {
          return this.rtm.sendMessage(`Soon, I'll  be able to tell you the time in ${res.location[0].value}!`, message.channel);
        } else {
          return this.rtm.sendMessage('I talked to Wit!', message.channel);
        }
      });
    }
  }
};

module.exports = SlackClient;
