const express = require('express');
const url = require('url');
const https = require('https');

const router = express.Router();

router.get('/thumbnail', async (req, res) => {
	if (req.query.q) {
		var parts = url.parse(req.query.q);
		if (parts.hostname === 'yt3.ggpht.com' || parts.hostname === 'i.ytimg.com') {
			try {
				var proxy = https.request({
					hostname: parts.hostname,
					path: parts.path
				}, function (response) {
					res.writeHead(response.statusCode, response.headers);
					response.pipe(res, {
						end: true
					});
				});
				req.pipe(proxy, {
					end: true
				});
			} catch (e) {
				return res.render('error.ejs', {
					error_code: 501,
					error: e
				});
			}
		} else {
			return res.render('error.ejs', {
				error_code: 400,
				error: 'Hostname does not match valid thumbnail domains.'
			});
		}
	} else {
		return res.redirect('/');
	}
});

module.exports = router;