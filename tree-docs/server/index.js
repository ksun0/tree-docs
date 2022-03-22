const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
const mountRoutes = require('./routes')
mountRoutes(app);

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 3000;


app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));

