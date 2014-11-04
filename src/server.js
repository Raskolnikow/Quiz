var connect = require('connect');

var app = connect();

app.use(connect.logger('tiny'));
app.use(connect.static(__dirname + '/public'));
app.use(connect.query());
app.use(connect.bodyParser());

app.use(function(req, res) {
	if(req.method == 'POST') {
		res.end(JSON.stringify(req.body));
	}
});

app.listen(8080);