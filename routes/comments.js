mongoose = require("mongoose")
require( '../db' );
site = mongoose.model('site')

exports.home = function (req, res) {
	page = req.query.page || 0
	skipNum = parseInt(page) * 25 + 1  || 0

	site.find({}).sort('-date').exec(function(err, comments) { 
		if (comments) {
			res.render('comments', {
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