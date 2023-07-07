const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true,useUnifiedTopology: true});

// acquire the connection
const db = mongoose.connection;

// if error
db.on('error',console.error.bind(console,'error connecting to db'));

db.once('open', function(){
    console.log('Successfully connected to the database');
});


