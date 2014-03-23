var mongoose = require('mongoose')
var Schema = mongoose.Schema
    ,ObjectId = Schema.ObjectId;

var db_url = process.env.MONGOHQ_URI || "mongodb://localhost:27017/cudos", 
    db = mongoose.connect(db_url);


var userSchema = new Schema({
    id: ObjectId,
    username: String,
    password: String,
    favorites: [String],
    comments: [{comment: String, cudos: Number}]
});

var siteSchema = new Schema({
	id: ObjectId,
    title: String,
	link: String,
	cudos: Number,
    category: String,
    bid: String
});

var commentSchema = new Schema({
    id: ObjectId,
    body: String,
    cudos: Number,
    user: String,
    date: String
});

var user = db.model('user', userSchema);
var site = db.model('site', siteSchema);
var comment = db.model('comment', commentSchema);