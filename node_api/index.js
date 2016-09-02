var express = require('express');
var app = express();
var todoList = require('./courseList');
var auth = require('./auth');
var _ = require('lodash');
var bodyParser = require('body-parser');
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header('Access-Control-Allow-Origin', req.get('origin'));
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	// intercept OPTIONS method
	if ('OPTIONS' == req.method) {
		res.sendStatus(200);
	}
	else {
		next();
	}
});

app.use(function (req, res, next) {
	res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
	res.header('Expires', '-1');
	res.header('Pragma', 'no-cache');
	next();
});


var todoRouter = express.Router();
app.use('/todo', todoRouter);


todoRouter.get('/', function (req, res) {
	res.status(200).json(todoList);
});

todoRouter.get('/:id', function (req, res) {
	var todoItem = _.find(todoList, i => i.id === +req.params.id);
	if (todoItem) {
		res.status(200).json(todoItem);
	} else {
		res.status(400).json({errorMessage: 'Элемент не найден'});
	}

});
todoRouter.post('/auth', function (req, res) {
	var data = req.body;
	var maxId = _.max(todoList.map(i => i.id));
	if (data.login == 'q' ) {
		var userProfile = {
			id: maxId,
			name: data.login,
			isLogged: true
		};
		res.status(201).json(userProfile);
	} else {
		var error = {
			code: 25,
			message: 'Не правильный логин или пароль',
			error: true
		};
		res.status(202).json(error)
	}
		var user = _.find(auth, (i) => i.name === data.login);
		if (user) {
			_.assign(i, userProfile)
		} else {
			auth.push(userProfile);
		}



});

todoRouter.get('/auth/:name', function (req, res) {
	var user = _.find(auth, (i) => i.name === req.params.name);
	if (user) {
		res.status(200).json(user);
	} else {
		res.status(400).json({errorMessage: 'Элемент не найден'});
	}
});
todoRouter.post('/', function (req, res) {
	var data = req.body;

	var maxId = _.max(todoList.map(i => i.id));
	var todoItem = {
		id: (maxId || 0) + 1,
		name: data.name,
		description: data.description,
		duration: data.duration
	};

	todoList.push(todoItem);

	res.status(201).json(todoItem);
});

todoRouter.put('/:id', function (req, res) {
	var data = req.body;

	var todoItem = {
		id: data.id,
		name: data.name,
		description: data.description,
		duration: data.duration,
		date: data.date
	};

	var existingTodoItem = _.find(todoList, i => i.id === +req.params.id);
	Object.assign(existingTodoItem, todoItem);

	res.status(204).end();
});

todoRouter.delete('/:id', function (req, res) {
	_.remove(todoList, i => i.id === +req.params.id);
	res.status(204).end();
});

app.listen(3333);
console.log('Listening http://localhost:3333/');

