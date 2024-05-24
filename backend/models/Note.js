const mongoose = require('mongoose');
const { Schema } = mongoose;

const notesSchema = new Schema({

    ownerId: {
        type: mongoose.Types.ObjectId
    },
    title : {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dateOfCreation: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('notes', notesSchema);