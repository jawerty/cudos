mongoose = require("mongoose")
require( '../db' );
site = mongoose.model('site')

exports.home = function (req, res) {
	page = req.query.page
	skipNum = page + 1 * 25 || 0
	site.find({}).sort('-cudos').limit(25).skip(skipNum).exec(function(err, sites) { 
		if (sites) {
			res.render('categories', {
		        title: 'cudos',
		        layout: 'layout',
		        links: sites
		    });
    	} else {
    		console.log("not working")
    		res.end()
    	}
	});
};