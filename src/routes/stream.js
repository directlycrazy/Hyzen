/*const express = require('express');
const ytdl = require('ytdl-core');
const url = require('url')
const https = require('https')

const router = express.Router();

router.get('/', async (req, res) => {
	if (req.query.v) {
		if (ytdl.validateID(req.query.v) === true) {
			var info = await ytdl.getInfo(req.query.v);
			var parts = url.parse(info.formats[0].url);
			var filename = parts.pathname.split("/").pop().split('.').pop();
			var externalReq = https.request({
				hostname: parts.hostname,
				path: parts.path
			}, function (externalRes) {
				if (externalRes.headers['accept-ranges'] === undefined) return res.sendStatus(500);
				res.writeHead(200, externalRes.headers);
				externalRes.pipe(res);
			});
			externalReq.end();
		} else {
			return res.sendStatus(404);
		}
	} else {
		return res.redirect('/');
	}
});

module.exports = router;*/