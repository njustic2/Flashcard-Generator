const ClozeCard = function(text, cloze) {
  	
  	this.fullText = text;
  	this.clozeDeletion = cloze;
  	this.partialText = text.replace(cloze, "...");
};

module.exports = ClozeCard;