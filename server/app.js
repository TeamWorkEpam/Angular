var express = require('express');
var path = require('path'); // модуль для парсинга пути
var app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

data = {
	categories: [],
	goods: {},
	nav: [],
	descriptionWare: {}
};
data.categories = require('./categories.js');
data.descriptionWare = require('./description.js');
data.goods = require('./goods.js');
data.nav = require('./navigation.js');
data.search = require('./search.js');
app.use(express.static(path.join(__dirname, "../build")));
app.get('/description', function (req, res, next) {
    res.send(data.descriptionWare);
});
app.get('/wares', function (req, res, next) {
    res.send(data.categories);
});
app.get('/search', function (req, res, next) {
    res.send(data.search);
});
app.get('/goods', function (req, res, next) {
    res.send(data.goods);
});
app.get('/nav', function (req, res, next) {
    res.send(data.nav);
});
app.listen(1337, function(){
    console.log('Express server listening on port 1337');
});