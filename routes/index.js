mongoose = require("mongoose")
require( '../db' );
site = mongoose.model('site')

exports.home = function (req, res) {
	page = req.query.page || 0
	skipNum = parseInt(page) * 25 + 1  || 0

	site.find({}).sort('-cudos').limit(25).skip(skipNum).exec(function(err, sites) { 
		if (sites) {
			res.render('categories', {
		        title: 'cudos',
		        layout: 'layout',
		        links: sites,
		        page: page
		    });
    	} else {
    		console.log("not working")
    		res.end()
    	}
	});
};