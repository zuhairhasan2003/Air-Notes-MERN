const mongoose = require('mongoose');
const mongooseUri = "mongodb://localhost:27017/airNotes";

const connectToDb = async() =>{
    await mongoose.connect(mongooseUri);
}

module.exports = connectToDb;
