const express = require('express');
const ytdl = require('ytdl-core');

const router = express.Router();

router.get('/', async (req, res) => {
	if (req.query.v) {
		if (ytdl.validateID(req.query.v) === true) {
			try {
				var info = await ytdl.getInfo(req.query.v);
				if (info.formats.length === 0){
					return res.render('error.ejs', {
						error: 'Could not find any media sources for this video. It may be blocked in the server\'s country.'
					});
				}
				return res.render('video.ejs', {
					details: info.videoDetails,
					recommendations: info.related_videos,
					formats: info.formats
				});
			} catch (e) {
				return res.render('error.ejs', {
					error: e
				});
			}
		} else {
			return res.render('error.ejs', {
				error: 'Video not found.'
			});
		}
	} else {
		return res.redirect('/');
	}
});

module.exports = router;