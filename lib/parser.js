var _ = require('underscore'),
	person = require('../db.js').person,
	async = require('async');

var reduce = function(data) {
		var a = [];
		_.each(data, function(value, key) {
			value['firebaseID'] = key;
			a.push(value)
		})
		return a;
	}

var fetch = function(type,single) {
	if (type == 'baidu') {
		var s = {
			desc : single.message
		}
	} else if (type == '360') {
		var s = {
			desc : single.message,
			name : single.name,
			gender: single.sex === '男' ? 'male' : 'female',
			contact: {
				name : single.contact_person
			}
		}
	} else if (type == 'sohu') {
		var s = {
			age : single.age,
			desc : single.message,
			name : single.name,
			gender: single.sex,
			pubdate: single.time,
			contact: {
				name : single.contact_person,
				mobile: single.phone
			}
		}
	}
	s['firebaseID'] = single.firebaseID;
	return s;
}

module.exports = function(type, data, query, callback) {

	var parseSingle = function(single, cb) {
			person.findOne({
				firebaseID: single.firebaseID,
				via: type
			}).exec(function(err,doc){
				if (!err) {
					if (doc) {
						console.log('exsits')
						cb();
					} else {
						var s = fetch(type,single);
						s['via'] = type;
						var newPerson = new person(s);
						newPerson.save(function(err){
							if (!err) {
								console.log(newPerson.firebaseID + 'saved ok')
								cb()
							}
						})
					}
				} else {
					cb()
				}
			})			
		}

	async.each(reduce(data), parseSingle, function(err) {
		if(!err) {
			callback(data);
		}
	})
}