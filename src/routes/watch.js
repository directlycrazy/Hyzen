const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
	if (req.query.v) {
		return res.redirect('/video?v=' + req.query.v);
	} else {
		return res.redirect('/');
	}
});

module.exports = router;