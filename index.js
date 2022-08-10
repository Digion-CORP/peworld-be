require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const bodyParser = require("body-parser")
const cors = require('cors')
const path = require('path')

const app = express()
const { port } = process.env
const db = require('./helper/mysql');
const router = require('./routes/index')

var corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(morgan('dev'));
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: false }));
// support parsing of application/json type post data
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/v1', router)
app.use('/api/v1/*', (req, res) => {
  res.status(404).send('URL not found!')
})

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`)
})