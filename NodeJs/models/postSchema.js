const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema ({
    title: {type: String, required: true},
    image: {type: String, required: true},
    description: {type: String, required: true},
    createdBy: {
        username: {type: String, required: true},
        userId: {type: String, required: true}
    },
    comments: [{
        text: {type: String, required: true},
        createdBy: {type: String, required: true},
        createdByImage: {type: String, required: true},
        date: {type: Number, default: Date.now()}
    }],
    date: {type: Number, default: Date.now()}
})

module.exports = mongoose.model('Posts', postSchema);