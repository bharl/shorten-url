const bodyParser = require('body-parser');
const route      = require('./routes/index');
const express    = require('express');
const app 	     = express();

const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', route);

app.get('/', (req, res) => {
	res.status(200).end();
});

app.listen(port, () => {
	console.log('Listening on port' + port + '...');
});