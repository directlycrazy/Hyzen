const express = require('express');
const trending = require('yt-trending-scraper');

const router = express.Router();

router.get('/', (req, res) => {
	return res.redirect('/my/trending');
});

router.get('/trending', async (req, res) => {
	trending.scrape_trending_page().then((results) => {
		return res.render('trending.ejs', {
			results: results
		});
	}).catch((error) => {
		return res.render('error.ejs', {
			error: e
		});
	});
});

module.exports = router;