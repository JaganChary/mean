var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/mean', {useNewUrlParser: true}, (err, db) => {
        if(err) {
            return console.log(err);
        }
        closure(db);
    });
}

let response = {
    status: 200,
    message: null,
    data: []
}

var sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == "object" ? err.message : err;
    response.status(501).json(response);
}

router.get('/population', (req, res) => {
    connection((db) => {
        db.db('mean').collection('DelhiPopulationData').find({}).toArray().then((population) => {
            response.data = population;
            res.json(response);
        })
    })
})

module.exports = router;