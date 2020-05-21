var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var tvshowSchema = new Schema(
	{
		title: String,
		year: Number ,
		country: String,
		poster: String,
		seasons: Number,
		genre: String,
		summary: String
	}
);

module.exports = mongoose.model('TVShow', tvshowSchema);