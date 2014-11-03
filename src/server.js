var connect = require('connect');

var app = connect();

app.use(connect.logger('tiny'));
app.use(connect.static(__dirname + '/public'));
app.use(connect.query());
app.use(connect.bodyParser());

app.use(function(req, res) {
	if(req.method != 'GET') {
		res.end("Hello World!!")
	}
});

app.listen(8080);