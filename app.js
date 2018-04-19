const bodyParser = require('body-parser');
const route      = require('./routes/index');
const express    = require('express');
const path       = require('path');
const app        = express();

const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', route);

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('*', function(req, res) {
	res.status(404).send('Page not found!');
});

app.listen(port, () => {
	console.log('Listening on port ' + port + '...');
});