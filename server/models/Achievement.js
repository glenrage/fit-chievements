'use strict';

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const slug = require('slug');
const User = mongoose.model('User');

const articleSchema = new mongoose.Schema({
  slug: {type: String, lowercase: true, unique: true},
  title: String,
  description: String,
  likes: {Type: Number, default: 0},
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
  tagList: [{ type: String }],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {timestamps: true});

articleSchema.plugin(uniqueValidator, {message: 'is aready taken'});

articleSchema.pre('validate', function(next) {
  if(!this.slug) {
    this.slugify();
  }

  next();
})

articleSchema.methods.slugify = function() {
  this.slug = slug(this.title) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};

articleSchema.methods.updateLikesCount = function() {
  let article = this

  return User.count({likes: {$in: [article._id]}}).then(function(count) {
    article.likesCount = count;

    return article.save();
  });
};

articleSchema.methods.toJSONFor = function(user) {
  return {
    slug: this.slug,
    title: this.title,
    description: this.description,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    tagList: this.tagList,
    liked: user ? user.isLike(this._id) : false,
    likesCount: this.likesCount,
    author: this.author.toProfileJSONFor(user)
  };
};

mongoose.model('article', articleSchema);
