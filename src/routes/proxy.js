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

router.get('/video', (req, res) => {
	if (req.query.q) {
		var parts = url.parse(req.query.q);
		try {
			if (parts.hostname.split('.')[parts.hostname.split('.').length - 2] + '.' + parts.hostname.split('.')[parts.hostname.split('.').length - 1] === 'googlevideo.com') {
				try {
					var externalReq = https.request({
						hostname: parts.hostname,
						path: parts.path.replace('QUERY', '?')
					}, function (externalRes) {
						res.writeHead(200, externalRes.headers);
						externalRes.pipe(res);
					});
					externalReq.end();
				} catch (e) {
					return res.render('error.ejs', {
						error_code: 501,
						error: e
					});
				}
			}
		} catch (e) {
			return res.render('error.ejs', {
				error_code: 501,
				error: e
			});
		}
	} else {
		return res.redirect('/');
	}
});

module.exports = router;