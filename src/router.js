const express = require('express');
const fs = require('fs');

const router = express.Router();

fs.readdir(__dirname + '/routes', (err, files) => {
	if (err) return console.error(err);
	files.forEach((file, index) => {
		try {
			router.use('/' + file.slice(0, file.length - 3), require(__dirname + '/routes/' + file));
		} catch (e) { }
		if (index + 1 === files.length) {
			router.use(express.static('assets'));
			router.get('/', (req, res) => {
				return res.redirect('/my/');
			});
			router.get('/:id', (req, res) => {
				if (req.params.id.length === 11) {
					return res.redirect('/video?v=' + req.params.id);
				} else {
					return res.render('error.ejs', {
						error: 'Video not Found.'
					});
				}
			});
			router.get('*', (req, res) => {
				return res.render('error.ejs', {
					error: 'Page not Found.'
				});
			});
		}
	});
});

module.exports = router;