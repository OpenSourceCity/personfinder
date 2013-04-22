module.exports = function(req, res, next) {
	res.render('index', {
		title: '寻人主页'
	});
};