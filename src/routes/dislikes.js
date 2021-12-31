const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/', async (req, res) => {
	if (req.query.v) {
		axios.get('https://returnyoutubedislikeapi.com/Votes?videoId=' + req.query.v).then((resp) => {
			return res.send(resp.data);
		});
	} else {
		return res.render('error.ejs', {
			error: 'Missing dislikes count'
		});
	}
});

module.exports = router;