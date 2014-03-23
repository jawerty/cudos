function genID()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 32; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

exports.generate = function (req, res) {
	h = genID()
	_button = "<iframe src='http://cudos-io.herokuapp.com/btn/"+h+"' name='cudos'></iframe>"
	res.render("generate", {title: "Cudos", button: _button})
};

exports.location = function (req, res) {
	res.send("")
};