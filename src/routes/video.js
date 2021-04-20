const express = require('express');
const ytdl = require('ytdl-core');

const router = express.Router();

router.get('/', async (req, res) => {
	if (req.query.v) {
		if (ytdl.validateID(req.query.v) === true) {
			var info = await ytdl.getInfo(req.query.v);
			return res.render('video.ejs', {
				url: (req.query.proxy === 'yes' ? `/stream?v=${req.query.v}` : (isNaN(req.query.quality) ? info.formats[info.formats.length - 1].url : info.formats[req.query.quality].url)),
				details: info.videoDetails,
				recommendations: info.related_videos,
				formats: info.formats
			});
		} else {
			return res.sendStatus(404);
		}
	} else {
		return res.redirect('/');
	}
});

module.exports = router;