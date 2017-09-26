module.paths.push('/usr/local/lib/node_modules');
var WordPOS = require('wordpos'),
    wordpos = new WordPOS();
// list all application names
var applications = ['css','email','sap','datapower','was','apache'];

module.exports = function(skill, info, bot,channel, message) {
	wordpos.getPOS(message.text, function(result){
	    console.log(result);
	});
	console.log('INVOCATION OF NON-CONFIGURED SKILL: ' + skill + " message: "+message.text);	
	applications.forEach(function(word){
		if(message.text.indexOf(word)>-1){
			bot.sendMessage('The health of the '+word+' application is approximate 97%',channel);			
		}
	})
};