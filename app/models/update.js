// Example model

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var UpdateSchema = new Schema({
	title: String,
	text: String,
	authors: String,
	url: String,
	imageUrl: String,
	dateCreated: { type: Date, default: Date.now, index: true },
	reloadNeeded: { type: Boolean, default: true },
	priority: { type: Number, default: 2 } // 1-3
});

// UpdateSchema.virtual('date')
// 	.get(function(){
// 		return this._id.getTimestamp();
// 	});

mongoose.model('Update', UpdateSchema);