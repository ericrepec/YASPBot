"use strict";

var NLP = require('natural');

module.exports = Brain; 

function Brain() {
  this.classifier = new NLP.LogisticRegressionClassifier();
  this.minConfidence = 0.7;
}

Brain.prototype.teach = function(label, phrases) {
  phrases.forEach(function(phrase) {
    console.log('Ingesting example for ' + label + ': ' + phrase);
    this.classifier.addDocument(phrase.toLowerCase(), label);
  }.bind(this));
  return this;
};

Brain.prototype.train = function() {
  this.classifier.train();

  // save the classifier for later use
  var aPath = './src/classifier.json';
  this.classifier.save(aPath, function(err, classifier) {
    // the classifier is saved to the classifier.json file!
    console.log('Writing to file: Creating a Classifier file in src/classifier.json.');
    });

  return this;
};

Brain.prototype.interpret = function(phrase) {
  var guesses = this.classifier.getClassifications(phrase.toLowerCase());
  var guess = guesses.reduce(toMaxValue);
  return {
    probabilities: guesses,
    guess: guess.value > this.minConfidence ? guess.label : null
  };
};

Brain.prototype.invoke = function(skill, info, bot,channel, message) {
  var skillCode;
  
  console.log('Grabbing code for skill: ' + skill);
  try {
    skillCode = require('../skills/' + skill);
  } catch (err) {
	  console.log(err.toString());
    throw new Error('The invoked skill doesn\'t exist!');
  }
  console.log('Running skill code for ' + skill + '...');
  skillCode(skill, info, bot,channel, message);
  return this;
};

function toMaxValue(x, y) {
  return x && x.value > y.value ? x : y;
}

Brain.prototype.classify = function (){
	//training the classifier (TODO: move this to another library)
	// time skill training
	this.classifier.addDocument('time please', 'time');
	this.classifier.addDocument('what time is it', 'time');
	this.classifier.addDocument('can you give me the time of day', 'time');
	this.classifier.addDocument('got the time', 'time');
	// application health skill training
	this.classifier.addDocument('what is the health of kjskdflsd application', 'app-health');
	this.classifier.addDocument('how is asdf application doing', 'app-health');
	this.classifier.addDocument('is jekjfkd up', 'app-health');
	this.classifier.addDocument('kdnvnd application status', 'app-health');
	// wwsd skill training
	this.classifier.addDocument('would you', 'wwsd');
	this.classifier.addDocument('your 12', 'wwsd');
	this.classifier.addDocument('your 6', 'wwsd');
	this.classifier.addDocument('your 3', 'wwsd');
}
