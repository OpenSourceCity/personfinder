// Generated by CoffeeScript 1.6.2
/*
Module dependencies.
*/

var app, createGame, express, fork, http, io, joinedSockets, path, routes, server, user;

express = require("express");

routes = require("./routes");

firebase = require("firebase");

user = require("./routes/user");

url = require('url');

http = require("http");

path = require("path");

fork = require("child_process").fork;

app = express();

server = http.createServer(app);

io = require("socket.io").listen(server);

app.set("port", process.env.PORT || 5000);

app.set("views", __dirname + "/views");

app.set("view engine", "jade");

app.use(express.favicon());

app.use(express.logger("dev"));

app.use(express.bodyParser());

app.use(express.methodOverride());

app.use(app.router);

app.use(express["static"](path.join(__dirname, "public")));

app.enable("trust proxy");

if ("development" === app.get("env")) {
  app.use(express.errorHandler());
}

app.get("/", routes.index);

app.get("/users", user.list);

app.get("/person_finder", function(req, res){
  var data = url.parse(req.url, true).query;
  var source = data['source']
  var type = data['type']
  var c = new firebase("http://wiredancer.firebaseio.com/"+source+"/"+type+"/");
  c.on("value", function(m){res.write(JSON.stringify(m.val()))});
})

server.listen(app.get("port"), function() {
  console.log("Express server listening on port " + app.get("port"));
  return 0;
});


