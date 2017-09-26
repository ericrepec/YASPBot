
module.exports = function(skill, info, bot,channel, message) {
	var currentdate = new Date(); 
	var datetime =  (currentdate.getMonth()+1) + "/"
	                + currentdate.getDate() + "/" 
	                + currentdate.getFullYear() + " @ "  
	                + currentdate.getHours() + ":"  
	                + currentdate.getMinutes() + ":" 
	                + currentdate.getSeconds();
	console.log('INVOCATION OF NON-CONFIGURED SKILL: ' + skill);
	bot.sendMessage('At the tone the time will be: '+datetime+".... Beep!",channel);
};
