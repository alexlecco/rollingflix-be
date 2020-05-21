var TVShow = require('../models/tvshow');

//GET - Return all tvshows in the DB
exports.findAllTVShows = function(req, res) {
	TVShow.find(function(err, tvshows) {
		if(err) res.send(500, err.message);
		
		res.status(200).jsonp(tvshows);
	});
};

//GET - Return a TVShow with specified ID
exports.findTVShowById = function(req, res) {
	TVShow.findById(req.params._id, function(err, tvshows) {
		if(err) return res.send(500, err.message);

		res.status(200).jsonp(tvshows);
	});
};

//POST - Insert a new TVShow in the DB
exports.addTVShow = function(req, res) {
	console.log('POST');

	var tvshow = new TVShow({
		title:    req.body.title,
		year: 	  req.body.year,
		country:  req.body.country,
		poster:   req.body.poster,
		seasons:  req.body.seasons,
		genre:    req.body.genre,
		summary:  req.body.summary
	});

	tvshow.save(function(err, tvshow) {
		if(err) return res.send(500, err.message);
		
		res.status(200).jsonp(tvshow);
	});
};

//PUT - Update a register already exists
exports.updateTVShow = function(req, res) {
	TVShow.findById(req.params._id, function(err, tvshow) {
		tvshow.title   = req.body.title;
		tvshow.year    = req.body.year;
		tvshow.country = req.body.country;
		tvshow.poster  = req.body.poster;
		tvshow.seasons = req.body.seasons;
		tvshow.genre   = req.body.genre;
		tvshow.summary = req.body.summary;

		tvshow.save(function(err) {
			if(err) return res.send(500, err.message);
			  
			res.status(200).jsonp(tvshow);
		});
	});
};

//DELETE - Delete a TVShow with specified ID
exports.deleteTVShow = function(req, res) {
	TVShow.findById(req.params._id, function(err, tvshow) {
		tvshow.remove(function(err) {
			if(err) return res.send(500, err.message);
			  
			res.status(200).send("tvshow deleted");
		})
	});
};