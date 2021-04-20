const express = require('express');
const search = require('ytsr');

const router = express.Router();

router.get('/', async (req, res) => {
	if (req.query.q) {
		let results = await search(req.query.q, {pages: 1})
		return res.render('search.ejs', {
			query: req.query.q,
			results: results.items
		})
	} else {
		return res.redirect('/');
	}
});

module.exports = router;