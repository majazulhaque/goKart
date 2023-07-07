const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://majazhaq98:AEzVHBJ9YGgKR7Qn@cluster0.w8w5ggy.mongodb.net/goKart',{useNewUrlParser: true,useUnifiedTopology: true});

// acquire the connection
const db = mongoose.connection;

// if error
db.on('error',console.error.bind(console,'error connecting to db'));

db.once('open', function(){
    console.log('Successfully connected to the database');
});


