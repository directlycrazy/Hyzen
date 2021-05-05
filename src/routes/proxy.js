const express = require('express');
const url = require('url');
const axios = require('axios');
const { createBandwidthThrottleGroup } = require('bandwidth-throttle-stream');

const router = express.Router();

router.get('/thumbnail', async (req, res) => {
	if (req.query.q) {
		var parts = url.parse(req.query.q);
		if (parts.hostname === 'yt3.ggpht.com' || parts.hostname === 'i.ytimg.com') {
			try {
				axios.get(req.query.q, {
					responseType: 'stream'
				}).then((stream) => {
					res.writeHead(stream.status, stream.headers);
					stream.data.pipe(res);
				}).catch(e => {
					return res.render('error.ejs', {
						error: e
					});
				});
			} catch (e) {
				return res.render('error.ejs', {
					error: e
				});
			}
		} else {
			return res.render('error.ejs', {
				error: 'Hostname does not match valid thumbnail domains.'
			});
		}
	} else {
		return res.redirect('/');
	}
});

const bandwidthThrottleGroup = createBandwidthThrottleGroup({
	bytesPerSecond: 5242880
});

router.get('/video', (req, res) => {
	if (req.query.q) {
		var parts = url.parse(req.query.q);
		try {
			if (parts.hostname.split('.')[parts.hostname.split('.').length - 2] + '.' + parts.hostname.split('.')[parts.hostname.split('.').length - 1] === 'googlevideo.com') {
				try {
					axios.get(req.query.q.replace('QUERY', '?'), {
						responseType: 'stream'
					}).then((stream) => {
						try {
							const throttle = bandwidthThrottleGroup.createBandwidthThrottle(stream.headers['content-length']);
							stream.data.pipe(throttle).pipe(res);
							res.writeHead(stream.status, stream.headers);
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
				} catch (e) {
					return res.render('error.ejs', {
						error: e
					});
				}
			}
		} catch (e) {
			return res.render('error.ejs', {
				error: e
			});
		}
	} else {
		return res.redirect('/');
	}
});

module.exports = router;