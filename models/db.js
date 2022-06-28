const mongoose = require('mongoose');
const User = require('./user');

module.exports.connect = (async ()=> {

    const mongooseOpts = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }

    mongoose.connect(process.env.MONGO_URI, mongooseOpts).then(()=>  console.log("db is connected"))
    .catch(error => console.log(error.message));
});

module.exports.closeConnection = (async () =>{
    await mongoose.connection.close();

});

