/** @format */

const express = require('express');
const app = express();
const authRouter = require('./authRouter');
const profileRouter = require('./profileRouter');
const skillRouter = require('./skillRouter');
const portofolioRouter = require('./portofolioRouter');
const notificationRouter = require('./notificationRouter');
const experienceRouter = require('./experienceRouter');

app.use('/auth', authRouter);
app.use('/profile', profileRouter);
app.use('/skill', skillRouter);
app.use('/portofolio', portofolioRouter);
app.use('/notification', notificationRouter);
app.use('/experience', experienceRouter);

module.exports = app;