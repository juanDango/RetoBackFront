const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = "mongodb://localhost:27017/"

const dbName = 'job';

const client = new MongoClient(url, { useUnifiedTopology: true });

const getDatabase = (callback) => {
    client.connect(function (err) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);

        callback(db, client);
    });
}

const findDocuments = function (db, callback) {
    const collection = db.collection('offers');
    collection.find({}).toArray(function (err, docs) {
        assert.equal(err, null);
        callback(docs);
    });
}

const postDocuments = function (db, callback, object) {
    const collection = db.collection('offers');
    collection.insertOne(object).then(res => callback(res.ops))
}

exports.getDatabase = getDatabase;
exports.findDocuments = findDocuments;
exports.postDocuments = postDocuments;