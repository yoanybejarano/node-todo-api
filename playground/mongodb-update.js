const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/todo-app', { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect MongoDB Server.');
    }
    console.log('Connected MongoDB Server.');
    const db = client.db('todo-app');

    //findOneAndDelete
    db.collection('todos').findOneAndUpdate(
        {
            "_id": new ObjectID("5b946bbaa2d76d39365d2a39")
        }, {
            $set: { text: "Something to do has done" }
        }, {
            returnOriginal: false
        }).then((result) => {
            console.log(result);
        }, (err) => {
            console.log('Unable to delete doc: ', err);
        });

    //client.close();
});