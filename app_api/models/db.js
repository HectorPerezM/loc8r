const mongoose = require('mongoose');
const dbURI = 'mongodb://localhost/Loc8r'
const mongoAtlasURI = process.env.MONGO_ATLAS_URI
mongoose.connect(mongoAtlasURI, {useNewUrlParser: true});

mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to MongoDB Atlas`);
});

mongoose.connection.on('error', err => {
    console.log('Mongoose connection error: ', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('')
});

const gracefulShutdown = (msg, callback) => {
    mongoose.connection.close(() => {
        console.log(`Mongoose disconnected through ${msg}`);
        callback();
    });
};

/* Event listener to close connection */
process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});

process.on('SIGINT', () => {
    gracefulShutdown('app termonation', () => {
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    gracefulShutdown('Heroku app shutdown', () => {
        process.exit(0);
    });
});

/* Adding models */
require('./locations');