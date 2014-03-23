mongoose = require("mongoose");
require( '../db' );
site = mongoose.model('site');
util = require("util");


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
	_button = ""
};

exports.generate_post = function (req, res) {
	title = req.body.title
	category = req.body.category

	h = genID()

	if(site.findOne({bid: h}, function(err, sites){
 		if(sites){
 			_error = "This has already been posted, try again."
 			res.redirect("/getcudos")
 		} else {
 			var newSite = new site({ 
				title: title,
				cudos: 0,
				category: category,
				bid: h,
				date: new Date().getTime()
		    });

		    newSite.save();
		    _error = "Here's your button, friend"
		    _button = "<div id='cudos_button'></div><script type='text/javascript' >url = document.URL;iframe = document.createElement('IFRAME'); iframe.setAttribute('src', 'http://cudos-io.herokuapp.com/btn/"+h+"?url='+url);iframe.style.minWidth = 120+'px'; iframe.style.height = 60+'px'; iframe.frameBorder='0';iframe.style.name='"+title+"'; document.getElementById('cudos_button').appendChild(iframe); </script>"

 			res.redirect("/getcudos");

 		}
 	}));

	
};

exports.location = function (req, res) {
	bid = req.params.bid
	link = req.query.url;

	_url = ROOT + "/btn/" + bid
	console.log(ROOT)
	if(site.findOne({bid: bid}, function(err, match){
		if (match) {
			cudos = match.cudos
			res.render("button", {cudos: cudos, url: _url, bid: bid, link: link});
		} else {
			console.log("not working")
		}
	}));
};

exports.location_post = function (req, res) {
	bid = req.body.bid;
	cudos = req.body.cudos;
	link = req.body.link;
	console.log("link: "+cudos)
	if(site.findOne({bid: bid}, function(err, sites){
		if (sites) {
			sites.cudos = cudos
			sites.link = link

		    sites.save();
		    res.end();
		} else {
			console.log("not working")
			res.end();
		}
	}));
};