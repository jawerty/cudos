mongoose = require("mongoose")
require( '../db' );
site = mongoose.model('site')

function genID()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 32; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

exports.generate = function (req, res) {	
	res.render("generate", {title: "Cudos", button: _button, error: _error})
	_error = ""
};

exports.generate_post = function (req, res) {
	title = req.body.title
	category = req.body.category

	h = genID()
	_button = "<iframe src='http://cudos-io.herokuapp.com/btn/"+h+"' name="+title+"></iframe>"

	if(site.findOne({bid: h}, function(err, sites){
 		if(sites){
 			_error = "This has already been posted, try again."
 			res.redirect("/getcudos")
 		} else {
 			var newSite = new site({ 
				title: title,
				cudos: 0,
				category: category,
				bid: h
		    });
		    
		    newSite.save();
		    _error = "Here's your button, nigga"

 			res.redirect("/getcudos");

 		}
 	}));

	
};

exports.location = function (req, res) {
	bid = req.params.bid

	if(site.findOne({bid: bid}, function(err, match){
		if (match) {

		}
	}));
};