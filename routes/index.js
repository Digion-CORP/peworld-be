const express = require("express");
const app = express()
const authRouter = require('./authRouter')

app.use('/auth', authRouter)

module.exports = app