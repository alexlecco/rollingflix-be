//require modules
let express        = require("express"),
    app            = express(),
    http           = require("http"),
    server         = http.createServer(app),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    mongoose       = require('mongoose')
    cors           = require('cors');

//app settings
const port = 3001;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());

//connect mongodb----------------------------------
mongoose.connect('mongodb://localhost/tvshows', function(err, res) {
	if(err) {
		console.log('ERROR: connecting to Database. ' + err);
	} else {
		console.log('Connected to Database');
	}
});
//-------------------------------------------------

//require controller TVShowCtrl
let TVShowCtrl = require('./controllers/tvshows');

//define API routes-------------------------------
let tvshows = express.Router();

tvshows.route('/')
  .get(function(req, res) {
    res.send("Hello World!");
  })

tvshows.route('/tvshows')
  .get(TVShowCtrl.findAllTVShows)
  .post(TVShowCtrl.addTVShow);

tvshows.route('/tvshows/:_id')
  .get(TVShowCtrl.findTVShowById)
  .put(TVShowCtrl.updateTVShow)
  .delete(TVShowCtrl.deleteTVShow);
//-------------------------------------------------

//app uses tvshows router (last app setting)
app.use(tvshows);

//start server
server.listen(port, () => console.log("Listen on port " + port));