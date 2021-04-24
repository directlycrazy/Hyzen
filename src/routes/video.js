const express = require('express');
const ytdl = require('ytdl-core');

const router = express.Router();

router.get('/', async (req, res) => {
	if (req.query.v) {
		if (ytdl.validateID(req.query.v) === true) {
			try {
				var info = await ytdl.getInfo(req.query.v);
				return res.render('video.ejs', {
					details: info.videoDetails,
					recommendations: info.related_videos,
					formats: info.formats
				});
			} catch (e) {
				return res.render('error.ejs', {
					error_code: 501,
					error: e
				});
			}
		} else {
			return res.render('error.ejs', {
				error_code: 404,
				error: 'Video not found.'
			});
		}
	} else {
		return res.redirect('/');
	}
});

module.exports = router;