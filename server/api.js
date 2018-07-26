var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/mean', { useNewUrlParser: true }, (err, db) => {
        if (err) {
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

// Get Data from Database 
router.get('/population', (req, res) => {
    connection((db) => {
        db.db('mean').collection('DelhiPopulation').find({}).toArray().then((population) => {
            response.data = population;
            res.json(response);
        })
    })
});

// Save Data to Database
router.post('/population/add', (req, res) => {
    connection((db) => {
        var addRecord = req.body;
        console.log(req.body);
        db.db('mean').collection('DelhiPopulation').insertOne(addRecord).then((record) => {
            console.log('1 document inserted');
            response.data = addRecord;
            res.json(response);
            db.close();
        })
    })
})

// Delete Data from Database
router.delete('/population/:id', (req, res) => {
    connection((db) => {
        db.db('mean').collection('DelhiPopulation').deleteOne({"_id": ObjectID(req.params.id)}).then(() => {
            console.log('1 Document Deleted');
            response.data = req.params.id;
            res.json(response);
            db.close();
        })
    })
});

// Edit Data from Database
router.put('/population/update/:id', (req, res) => {
    connection((db) => {
        var populationRecord = {
            Year: req.body.Year,
            Population: req.body.Population,
            GrowthRate: req.body.GrowthRate,
            Growth: req.body.Growth,
        }

        console.log('connected');
        console.log(populationRecord);
        
        db.db('mean').collection('DelhiPopulation').findOneAndUpdate({_id: ObjectID(req.params.id)}, {$set: populationRecord}, { new: true }).then(() => {
            response.data = populationRecord;
            res.json(response);
            db.close();
        })
    }) 
})

module.exports = router;