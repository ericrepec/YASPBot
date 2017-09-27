/**
 * YASPbot
 * Author: Eric Repec
 * Desc: Test bed for interactive system for CIEM needs
 */

/* eslint no-console:0 */



var RtmClient = require('@slack/client').RtmClient;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
var MemoryDataStore = require('@slack/client').MemoryDataStore;
var natural = require('natural');
//var classifier = new natural.BayesClassifier();
var Brain = require('./src/brain');



var token = process.env.SLACK_API_TOKEN || 'xoxb-246030262992-ME7MN5EXVUaJdW2iHJg78FwP';
var yaspbot = {
		Brain: new Brain()
};

// training for classifier object  see ./src/brain.js
yaspbot.Brain.classify();

// train the classifier
yaspbot.Brain.train();

yaspbot.Brain.classifier.events.on('trainedWithDocument', function (obj) {
	   console.log(obj);
	   /* {
	   *   total: 23 // There are 23 total documents being trained against
	   *   index: 12 // The index/number of the document that's just been trained against
	   *   doc: {...} // The document that has just been indexed
	   *  }
	   */
	});
var botuserid = "";

var rtm = new RtmClient(token, {
	  logLevel: 'info', // check this out for more on logger: https://github.com/winstonjs/winston
	  dataStore: new MemoryDataStore() // pass a new MemoryDataStore instance to cache information
	});

var channel;

var isConnected = false;

// The client will emit an RTM.AUTHENTICATED event on successful connection, with the `rtm.start` payload
rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (rtmStartData) => {
  for (const c of rtmStartData.channels) {
          if (c.is_member && c.name ==='general_open_channel') { channel = c.id }
  }
  botuserid=rtmStartData.self.id;
  
//  console.log(rtmStartData);
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
  if(message.user){
	  console.log(
		    'User %s posted a message in %s channel',
		    rtm.dataStore.getUserById(message.user).name,
		    rtm.dataStore.getChannelGroupOrDMById(message.channel).name
	  );
	} 
  console.log("userid: %s botuserid %s",message.user,botuserid);
  // message event loop starts here
  if(message.text.length > 0 & botuserid!=message.user){  // need to verify that there is a valid message.text
	  var interpretation = yaspbot.Brain.interpret(message.text);
	  console.log("interpertation: ", interpretation);
	  if(message.text.indexOf("stopyasp")>-1)
	  {
	    console.log('YASP exiting(0)');
	    rtm.sendMessage('See ya later.',message.channel);
	    process.exit(0);
	  }else if (interpretation.guess) {
	      console.log('Invoking skill: ' + interpretation.guess);
	      yaspbot.Brain.invoke(interpretation.guess, interpretation, rtm,channel, message);
	  }
	}
});

rtm.on(RTM_EVENTS.REACTION_ADDED, function handleRtmReactionAdded(reaction) {
	  console.log('Reaction added:', reaction);
	});

rtm.on(RTM_EVENTS.REACTION_REMOVED, function handleRtmReactionRemoved(reaction) {
  console.log('Reaction removed:', reaction);
});

