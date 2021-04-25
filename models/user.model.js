const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    user_id: {type: Number},
    first_name: {type: String},
    last_name: {type: String},
    phone_number: {type: String, minlength: 10, maxlength: 10},
    email: {type: String},
    password: {type: String},
    coachmark_visited: {type: Number, default: 0},
    assessment_complete: {type: Number, default: 0},
    assessment_skipped: {type: Number, default: 0},
    last_login: {type: Date},

}, {timestamps: { createdAt: 'created_date', updatedAt: 'last_updated_date'}});


module.exports = mongoose.model('User', UserSchema);