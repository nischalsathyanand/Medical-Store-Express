let mongoose = require('mongoose');


let medicineSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    use: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Medicine', medicineSchema);