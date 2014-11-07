// ------------------------ functions --------------------

function DataAccesObject(config) {

	if(config == null) {
		console.log('Invalid Database Parameter!! EXITING');
		return;
	}

	var dbConfig = config;
	var nano = require('nano');

	var couch = nano(dbConfig.uri + ":" + dbConfig.port);
	var db = couch.use(dbConfig.database);


	function putNewEntry(data) {

		db.insert(data, function(err) {
			if(err) console.log(err);
		})	
	}

	function listEntries(func) {
		db.list(func);
	}

	function getEntry(data_id, func) {
		db.get(data_id, func);
	}

	return {
		newEntry: putNewEntry,
		list: listEntries,
		getEntry: getEntry,
	};
}

module.exports = DataAccesObject;