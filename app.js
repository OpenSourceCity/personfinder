//                      _         
//   ____  __________  (_)___ ___ 
//  / __ \/ ___/ ___/ / / __ `__ \
// / /_/ (__  ) /___ / / / / / / /
// \____/____/\___(_)_/_/ /_/ /_/ 
//                               
// @brief: 标准寻人数据接口                              
// @author: MrWiredancer,GuoYu
// @version: 0.0.2
// @role: apis

var express = require('express'),
	path = require('path'),
	http = require('http'),
	firebase = require("firebase"),
	url = require('url'),
	fork = require("child_process").fork;

var index = require('./routes/index.js');

app = express();

app.configure(function() {
	app.set('port', process.env.PORT || 5000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser('lemonode'));
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
	app.enable("trust proxy");
});

app.configure('development', function() {
	app.use(express.errorHandler());
});

// routers
app.get("/", index);

// query
app.get("/query/:source", function(req, res) {
	var source = req.params.source;
	var type = 'search';
	var callback = new firebase("http://wiredancer.firebaseio.com/" + source + "/" + type + "/");
	callback.on("value", function(m) {
		res.json(m.val())
	});
});

// run
http.createServer(app).listen(app.get('port'));