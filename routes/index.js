exports.home = function (req, res) {
    res.render('index', {
        title: 'cudos',
        layout: 'layout'
    });
};


