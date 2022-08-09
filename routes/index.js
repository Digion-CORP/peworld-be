/** @format */

const express = require('express');
const app = express();
const authRouter = require('./authRouter');
const profileRouter = require('./profileRouter');
const skillRouter = require('./skillRouter');
const portofolioRouter = require('./portofolioRouter');

app.use('/auth', authRouter);
app.use('/profile', profileRouter);
app.use('/skill', skillRouter);
app.use('/portofolio', portofolioRouter);

module.exports = app;

//