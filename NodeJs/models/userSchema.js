const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {faker} = require('@faker-js/faker');

const userSchema = new Schema ({
    username: {type: String, required: true},
    image: {type: String, default: faker.image.avatarGitHub()},
    email: {type: String, required: true},
    password: {type: String, required: true},
    pokes: [{
        username: {type: String, required: true},
        date: {type: Number, default: Date.now()}
    }],
    date: {type: Number, default: Date.now()}
    /*Galimai reikes cia prideti pokes ateity*/
})

module.exports = mongoose.model('User', userSchema);