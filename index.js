/**
 * YASPbot
 * Author: Eric Repec
 * Desc: Test bed for interactive system for CIEM needs
 */

/* eslint no-console:0 */



var RtmClient = require('@slack/client').RtmClient;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;

var token = process.env.SLACK_API_TOKEN || 'xoxb-246030262992-SXaKRMdk3WNAGTi5JERLG8Iy';

var rtm = new RtmClient(token, { logLevel: 'info' });

var channel;
var isConnected = false;

// The client will emit an RTM.AUTHENTICATED event on successful connection, with the `rtm.start` payload
rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (rtmStartData) => {
  for (const c of rtmStartData.channels) {
          if (c.is_member && c.name ==='general_open_channel') { channel = c.id }
  }
  console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
});

// you need to wait for the client to fully connect before you can send messages
rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function () {
  console.log("Fired: CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED");
  rtm.sendMessage("Hello! YASP is now in the house.", channel);
  isConnected = true;
});

// start the real time messaging api
rtm.start();

rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {
  console.log('Message:', message);
  // message event loop starts here
  if(message.text.indexOf("stopyasp")>-1)
  {
    console.log('YASP exiting(0)');
    rtm.sendMessage('See ya later.');
    process.exit(0);
  }
});
