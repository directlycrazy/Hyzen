const express = require('express');
const url = require('url');
const https = require('https');

const router = express.Router();

router.get('/thumbnail', async (req, res) => {
	if (req.query.q) {
		try {
			var parts = url.parse(req.query.q);
			var proxy = https.request({
				hostname: parts.hostname,
				path: parts.path
			}, function (response) {
				res.writeHead(response.statusCode, response.headers)	
				response.pipe(res, {
					end: true
				});
			});
		
			req.pipe(proxy, {
				end: true	
			});
		} catch (e) {
			return res.sendStatus(400)
		}
	} else {
		return res.redirect('/');
	}
});

module.exports = router;