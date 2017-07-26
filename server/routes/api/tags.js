'use strict';

const router = require('express').Router();
const mongoose = require('mongoose');
const article = mongoose.model('article');

//return a list of tags
router.get('/', function(req, res, next) {
  article.find().distinct('tagList').then(tags => {
    return res.json({ tags: tags});
  }).catch(next);
});

module.exports = router;
