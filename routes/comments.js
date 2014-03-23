mongoose = require("mongoose")
require( '../db' );
comments = mongoose.model('comments')

exports.home = function (req, res) {
	page = req.query.page || 0
	skipNum = parseInt(page) * 25 + 1  || 0

	comments.find({}).sort('-date').exec(function(err, comments) { 
		if (comments) {
			res.render('categories', {
		        title: 'cudos',
		        layout: 'layout',
		        comments: comments
		    });
    	} else {
    		console.log("not working")
    		res.end()
    	}
	});
};