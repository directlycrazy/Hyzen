const express = require('express');
const channels = require('yt-channel-info');
const search = require('ytsr');

const router = express.Router();

router.get('/', (req, res) => {
	if (req.query.q) {
		channels.getChannelInfo(req.query.q, 0).then(async channel => {
			try {
				let videos = await search(channel.author, { pages: 2 });
				return res.render('channel.ejs', {
					query: req.query.q,
					channel: channel,
					videos: videos.items
				});
			} catch (e) {
				return res.render('error.ejs', {
					error: e
				});
			}
		}).catch(e => {
			return res.render('error.ejs', {
				error: e
			});
		});
	} else {
		return res.redirect('/');
	}
});

module.exports = router;