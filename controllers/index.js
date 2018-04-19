const express    = require('express');
const db         = require('../db/database');
const bodyParser = require('body-parser');
const app        = express();

const dictionary = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const base = dictionary.length;

exports.createShortURL = (req, res) => {
	var long_url = req.body.url;
	db.insert({ long_url: long_url, created_at: new Date().toUTCString() }).returning('*').into('data')
		.then(data => {
			res.status(200).json( {ok: true, url: req.get('host') + '/' + encodeURL(data[0].id) });
		})
		.catch(err => {
			console.log(err);
			res.status(500).end();
		});
};

exports.redirectByURL = (req, res) => {
	var id = decodeURL(req.params.id);
	db.select('long_url').from('data').where( {id: id} )
		.then(data => {
			if(data.length)
				return res.redirect(data[0].long_url);
			return res.json({ok: false, error: 'url not found'});
		}).catch(err => {
			console.log(err);
			res.status(500).end();
		});
};

const decodeURL = (str) => {
	var decoded = 0;
	for(var i = str.length; i > 0; i--) {
		index = dictionary.indexOf(str.charAt(i - 1));
		decoded += index * (Math.pow(base, str.length - i));
	}
	return decoded;
}

const encodeURL = (num) => {
	return (!num) ? ""
		: encodeURL(Math.floor(num / base)) + dictionary[num % base].toString();
};