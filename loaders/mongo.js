const mongoose = require('mongoose');

// create db connection

exports.connection = () => {
    const mongoose = require('mongoose');

    mongoose.connect(process.env.MONGO_URL, {
     family:4
    });
    
    // Wait for the connection to establish
    mongoose.Promise = global.Promise;
    mongoose.connection.on('open', () => {
      console.log('Connected to MongoDB!', process.env.MONGO_URL);
    });
};