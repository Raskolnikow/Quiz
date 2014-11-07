var connect = require('connect');
var DAO = require('./data_base.js');

var dbConfig = {
	uri: "http://127.0.0.1",
	port: 5984,
	database: "quiz_db",
};

var app = connect();

app.use(connect.logger('tiny'));
app.use(connect.static(__dirname + '/public'));
app.use(connect.query());
app.use(connect.bodyParser());

var dao = new DAO(dbConfig);

app.use('/new', function(req, res, next) {
	if(req.method == 'POST') {
		dao.newEntry(req.body);
		//res.end(JSON.stringify(req.body));
	}
});

app.use('/show_card', function(req, res, next) {
	if(req.method == 'POST') {
		dao.list(function(err, body) {
			if(!err) {
				var ar = [];
				var r1 = {};

				body.rows.forEach(function(doc) {
					ar[ar.length] = doc.id;
				})

				//console.log(ar);
				var rand_card = Math.floor(Math.random() * ar.length);
				dao.getEntry(ar[rand_card], function(err, result) {
					if(!err) {
						//console.log(result);
						r1.frage = result.frage;
						r1.antwort = result.antwort;

						//console.log(r1);

						res.writeHead(200, {'Content-Type': 'application/json'});
						res.end(JSON.stringify({ frage: r1.frage, antwort: r1.antwort}));
					}
					else
						console.log(err);
				})
			}
		});
	}
});

app.listen(8080);