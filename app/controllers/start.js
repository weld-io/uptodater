module.exports = {

	index: function (req, res, next) {
		console.log('INDEX');
		res.render('index', { title: 'UpToDater' });
	}

}