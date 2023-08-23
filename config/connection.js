const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongod://127.0.0.1:27017/socialnetwork_db');


module.exports = mongoose.connection;