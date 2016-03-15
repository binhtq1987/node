var express = require('express');
var mongojs = require('mongojs');
var db = mongojs('booklist', ['booklist']);

var bookRouter = express.Router();

var router = function(nav) {
	var books = '';
    
    db.booklist.find(function(err, docs){
        books = docs;
    });

	bookRouter.route('/')
		.get(function(req, res){
			res.render('bookListView', {
				title: 'Hello from render',
				nav: nav,
				books: books
			});
		});

	bookRouter.route('/:id')
		.get(function(req, res){
			var id = req.params.id;
			res.render('bookView', {
				title: 'Hello from render',
				nav: nav,
				book: books[id]
			});
		});

	return bookRouter;
};

module.exports = router;