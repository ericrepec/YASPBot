module.paths.push('/usr/local/lib/node_modules');
var WordPOS = require('wordpos'),
    wordpos = new WordPOS();
// list all application names
var first_reply = ['Need more information','Not sure, tell me more','Hummm, Maybe?'];
var questions = ['Does she talk with an accent?','Does she have all her teeth?','What is her hair color?  Bald is also acceptable'];
var answer = ['Only if she buys.','Of course, why not','STD = "Sounds totall doable"'];

module.exports = function(skill, info, bot ,channel, message) {

	console.log('INVOCATION OF: ' + skill + " on message: "+message.text);	
	bot.sendMessage("John would say: "+first_reply[Math.floor(Math.random() * first_reply.length)],channel); 
	bot.sendMessage("John would then say: "+questions[Math.floor(Math.random() * questions.length)],channel);
	bot.sendMessage("Finally John would say: "+answer[Math.floor(Math.random() * answer.length)],channel);
};