// app/models/question.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var QuestionSchema   = new Schema({
    name: String
});

module.exports = mongoose.model('Question', QuestionSchema);