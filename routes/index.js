/** @format */

const express = require('express');
const app = express();
const authRouter = require('./authRouter');
const profileRouter = require('./profileRouter');

app.use('/auth', authRouter);
app.use('/profile', profileRouter);

module.exports = app;
