const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    attendance: [{ type: String }],
    offDays: [{ type: String }],
    sickLeave: [{ type: String }],
    workingHours: [{ day: String, hours: Number }],
    deleted: {
        type: Boolean,
        default: false
    },
    hiringDate: {
        type: String,
        default: new Date().toISOString().split('T')[0]
    }
});

module.exports = mongoose.model('Employee', employeeSchema);