const mongoose = require('mongoose');


const TestAnsSchema = new mongoose.Schema({
    TestId:{
        type: Number,
        require: true,
    },
    userAnswers:{
        type: Array,
        require: true
    }, 
    score:{
        type: Number, 
        require: true
    },
    correct:{
        type: Number,
        require: true
    },
    incorrect:{
        type: Number,
        require: true
    },
    unattempted:{
        type: Number,
        require: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

const TestAns = mongoose.model('TestAns', TestAnsSchema);
module.exports = TestAns;