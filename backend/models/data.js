const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});

const Data = mongoose.model("Data", dataSchema);

module.exports = Data;