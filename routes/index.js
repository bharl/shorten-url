const express  = require('express');
const shorten  = require('../controllers/index');
const router   = express.Router();

router.route('/')
	.post(shorten.createShortURL);
	
router.route('/:id')
	.get(shorten.redirectByURL)

module.exports = router;
