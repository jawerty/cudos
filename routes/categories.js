mongoose = require("mongoose")
require( '../db' );
site = mongoose.model('site')

exports.index = function(res, req) {
	category = req.params.category;
	type = req.params.type

	if (typeof type == "undefined") {
		type = "top"
	}

	page = req.query.page
	skipNum = page + 1 * 25 || 0

	if (type == "top") {
		t = "cudos"
	} else if (type == "new") {
		t = "date"
	}

	site.find({}).sort('-'+t).limit(25).skip(skipNum).exec(function(err, sites) { 
		if (sites) {
			res.render('index', {
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