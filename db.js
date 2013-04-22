/**
 * db configs
 */

var mongoose = require('mongoose'),
	db = mongoose.createConnection('localhost', 'osc-person-finder'),
	Schema = mongoose.Schema;

var personModel = new mongoose.Schema({
	name: String,
	age: String,
	gender: String,
	pubdate: String,
	desc: String,
	contact: {
		mobile: String,
		name: String,
		location: String,
		email: String
	},
	via: String,
	firebaseID: String
})

exports.person = db.model('person', personModel);