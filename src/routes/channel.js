const express = require('express');
const channels = require('yt-channel-info');

const router = express.Router();

router.get('/', async (req, res) => {
	if (req.query.q) {
		channels.getChannelInfo(req.query.q, 0).then(channel => {
			return res.render('channel.ejs', {
				query: req.query.q,
				channel: channel
			})
		}).catch(e => {
			return res.sendStatus(404);
		});
	} else {
		return res.redirect('/');
	}
});

module.exports = router;