const mongoose = require('mongoose');

const crudTbl = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    page: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
})

const crud = mongoose.model('crud', crudTbl);
module.exports = crud;