const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/todo-app', { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect MongoDB Server.');
    }
    console.log('Connected MongoDB Server.');
    const db = client.db('todo-app');

    //deleteMany
    // db.collection('todos').deleteMany({ "completed": true }).then((result) => {
    //     console.log(result);
    // }, (err) => {
    //     console.log('Unable to delete doc: ', err);
    // });

    //deleteOne
    // db.collection('todos').deleteOne({ "completed": true }).then((result) => {
    //     console.log(result);
    // }, (err) => {
    //     console.log('Unable to delete doc: ', err);
    // });

    //findOneAndDelete
    db.collection('todos').findOneAndDelete({ "completed": true }).then((result) => {
        console.log(result);
    }, (err) => {
        console.log('Unable to delete doc: ', err);
    });

    //client.close();
});