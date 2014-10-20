mongoose = require("mongoose")
require( '../db' );
site = mongoose.model('site')
    
exports.index = function(req, res) {
	page = req.query.page || 0
	skipNum = parseInt(page) * 25 + 1  || 0

	category = req.params.category;
	type = req.params.type;
    
	if (typeof type == "undefined") {
		type = "top"
	}
    
	if (type == "top") {
		t = "cudos"
	} else if (type == "new") {
		t = "date"
	}
    
	site.find({category: category.toLowerCase()}).sort('-'+t).limit(25).skip(skipNum).exec(function(err, sites) { 
		if (sites.length <= 0) {
			sites = false;
			console.log("nothing in the category.")
		}

		if (sites) {
			res.render('categories', {
		        title: 'cudos',
		        layout: 'layout',
		        links: sites,
		        page: page
		    });
    	} else {
    		console.log("not working")
    		res.redirect("/")
    	}
	});
};  