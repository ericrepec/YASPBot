# yaspbot
YASP Bot
Author: Eric Repec <eric.repec@techologent. com>
Yet another side project chat bot
Will host needed tasks for the CIEM team and their customers



NOTES ----------------------------- RAW ----------------------------------
Good wiki: https://botwiki.org/resources/slackbots/

install Node.JS
# Install Node.js 7.x repository
curl -sL https://rpm.nodesource.com/setup_7.x | bash -

# Install Node.js and npm
yum install nodejs

Once Node.JS is installed 

initialize project create directory for new bot and make this the current directory

run npm init 
<answer all questions>
run npm install @slack/client --save
run npm install natural
run npm install wordnet-db
run npm install -g wordpos

URL for github slack official api https://github.com/slackapi/node-slack-sdk

yasp
token: xoxb-246030262992-SXaKRMdk3WNAGTi5JERLG8Iy

web hook api: https://technologentciem.slack.com/services/B78NPBWCD?added=1
uri: https://hooks.slack.com/services/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



message format
Message: { type: 'message',
  channel: 'C2U19MXL6',
  user: 'U2U23SM8S',
  text: 'testing 123',
  ts: '1506385424.000109',
  source_team: 'T2U1G3F29',
  team: 'T2U1G3F29' }

code examples
// The client will emit an RTM.AUTHENTICATED event on successful connection, with the `rtm.start` payload
rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (rtmStartData) => {
  for (const c of rtmStartData.channels) {
	  if (c.is_member && c.name ==='general') { channel = c.id }
  }
  console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
});

// you need to wait for the client to fully connect before you can send messages
rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function () {
  rtm.sendMessage("Hello!", channel);
});


NLP example
http://blog.templeton.host/self-training-nlp-enabled-slack-bot-tutorial/
Natural Node library
https://github.com/NaturalNode/natural

words library to extract the subject of the sentence
https://github.com/moos/wordpos

Wordnet download
http://wordnet.princeton.edu/wordnet/download/current-version/