// server.js

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Question = require('./app/models/question');
mongoose.connect('mongodb://localhost/giveupyourdream');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var port = process.env.PORT || 8080;
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});


router.route('/questions')
    .post(function(req, res) {
        var question = new Question();
        question.name = req.body.name;
        question.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Question created!' });
        });
    })
    .get(function(req, res) {
        Question.find(function(err, questions) {
            if (err)
                res.send(err);
            res.json(questions);
        });
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
