const mongoose = require('mongoose');

// creatin schema
const dataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Data', dataSchema);