var express = require("express");
var path    = require("path");
var app     = express();

app.use(express.static(__dirname + "/public"));
// app.use(express.static("/public"));
app.set("view engine", "ejs");
app.set('port', (process.env.PORT || 3000));

app.get('/', function(req, res) {
  res.render("index");
});

app.listen(app.get('port'), function() {
  console.log('calender app started on ' + app.get('port'));
});
