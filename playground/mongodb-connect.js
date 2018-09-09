const { MongoClient, ObjectID } = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/todo-app', { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect MongoDB Server.');
    }
    console.log('Connected MongoDB Server.');
    const db = client.db('todo-app');

    // db.collection('todos').find({ "_id": new ObjectID("5b946bbaa2d76d39365d2a39") }).toArray().then((docs) => {
    //     console.log('Todos')
    //     console.log(JSON.stringify(docs, undefined, 2))
    // }, (err) => {
    //     console.log('Unable to fetch todos ', err);
    // });

    db.collection('users').find().count().then((count) => {
        console.log(`Todos count: ${count}`);
    }, (err) => {
        console.log('Unable to fetch todos ', err);
    });

    // db.collection('users').find({ age: { $exists: false } }).forEach(function (mydoc) {
    //     var min = 1;
    //     var max = 100;
    //     var ageValue = Math.floor(Math.random() * (max - min + 1)) + min;
    //     console.log(ageValue);
    //     db.collection('users').updateOne({ _id: mydoc._id }, { $set: { age: ageValue } })
    // });

    //client.close();
});