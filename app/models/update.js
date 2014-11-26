// Example model

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var UpdateSchema = new Schema({
	title: String,
	text: String,
	authors: String,
	url: String,
	imageUrl: String,
	dateCreated: { type: Date, default: Date.now }
});

UpdateSchema.virtual('date')
	.get(function(){
		return this._id.getTimestamp();
	});

mongoose.model('Update', UpdateSchema);