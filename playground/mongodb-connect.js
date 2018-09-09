const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/todo-app', { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect MongoDB Server.');
    }
    console.log('Connected MongoDB Server.');
    const db = client.db('todo-app');

    db.collection('users').find().count().then((count) => {
        console.log(`Todos count: ${count}`);
    }, (err) => {
        console.log('Unable to fetch todos ', err);
    });
    
    //client.close();
});