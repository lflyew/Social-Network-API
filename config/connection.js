const { connect, connection } = require('mongoose');

const connection = process.env.MONGODB_URI || 'mongodb://localhost:27017/socialDB';

connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connection;