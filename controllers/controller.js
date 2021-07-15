const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const TestAns = require('../models/TestAns');
const User = require("../models/Users");
var mongoose = require('mongoose');

module.exports.signup = async (req, res) => {
    try {
        const {username, password } = req.body;
        console.log(username);
        const hashPassword = bcrypt.hashSync(password, 5);
        await User.findOne({ username: username }, async (e, info) => {
            try {
                if (e) console.log(e);
                if (!info) {
                    const newUser = new User({
                        username: username,
                        password: hashPassword
                    });
                    await newUser.save((e, data) => {
                        if(e) {console.log(e) ;}//"Something went wrong"});
                        res.status(200).send("true");
                        console.log(data);
                    });
                } else { res.send(false); }
            } catch (err) { throw new Error(err); }
        });
    } catch (err) { console.log(err) };
}

module.exports.signin = async (req, res) => {
    console.log(req.body);
    try {
        let token;
        const { username, password } = req.body;
        await User.findOne({ username: username }, async (e, info) => {
            if (e) console.log(e);
            if (info) {
                token = await info.generateAuthToken();
                res.cookie("eLearning", token, {
                    expires: new Date(Date.now() + (3 * 86400 * 1000)),
                    httpOnly: true
                })
                if (bcrypt.compareSync(password, info.password)) { return res.send("true"); } else { return res.send("false"); }
            } else { return res.send("null"); }
        });
    } catch (err) { console.log(err); }
}

module.exports.forgotPass = async (req, res) => {
    try {
        const checkMail = await User.findOne({ username: req.body.username });
        if (!checkMail) { return res.send("false"); }
        const hashPassword = bcrypt.hashSync(req.body.password, 5);
        const userInfo = await User.updateOne({ username: req.body.username }, { password: hashPassword }, { new: true });
        return res.status(200).send("true");
    } catch (err) { console.log(err); }

}

module.exports.home = async (req, res) => { res.send(req.validUser); }

module.exports.dashboard = async (req, res) => {
    try {
        const token = req.cookies.eLearning;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const userInfo = await TestAns.find({ userId: verifyToken._id });
        const testIds = [];
        var c, u, inc;
        for (var i = 0; i < userInfo.length; i++) {
            testIds[i] = (userInfo[i].TestId);
            c = userInfo[i].correct;
            u = userInfo[i].unattempted;
            inc = userInfo[i].incorrect;
        }
        const info = {
            testIds,
            c, u, inc
        }
        res.status(200).send(JSON.stringify(info));
    }
    catch (err) { console.log(err); }
}


module.exports.testAnalysis = async (req, res) => {
    try {
        const tid = req.body.id;
        const token = req.cookies.eLearning;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const ans = await TestAns.findOne({ $and: [{ userId: verifyToken._id }, { TestId: tid }] });
        const correct = ans.correct;
        const incorrect = ans.incorrect;
        const unattempted = ans.unattempted;
        const score = ans.score;
        const userInfo = await User.findOne({ $and: [{ _id: verifyToken._id }, { 'tests.TestId': tid }] });
        const info = [];
        var j = 0;
        for (var i = 0; i < userInfo.tests.length; i++) {
            if (userInfo.tests[i].TestId === tid) {
                info[j] = userInfo.tests[i].score;
                j = j + 1;
            }
        }
        const feed = {
            incorrect, correct, unattempted, score, info
        }
        res.status(200).send(JSON.stringify(feed));
    }
    catch (err) { console.log(err); }
}

module.exports.testans = async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        const token = req.cookies.eLearning;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const testAns = new TestAns({
            TestId: data.TestId + 1,
            userAnswers: data.userAnswers,
            score: data.score,
            userId: verifyToken._id,
            correct: data.correct,
            incorrect: data.incorrect,
            unattempted: data.unattempted
        });
        console.log("Saved info: " + testAns);
        const testTaken = await TestAns.findOneAndDelete({ $and: [{ userId: verifyToken._id }, { TestId: data.TestId + 1 }] });
        if (!testTaken) {
            console.log("Not Found");
        }
        else {
            console.log("testTaken: " + testTaken);
        }

        await testAns.save(async (e, data) => {
            if (e) { console.log(e); }
            else {
                console.log(" Hello : " + data)
            }
        });


        const newTest = {
            TestId: data.TestId + 1,
            score: data.score
        }
        const userInfo = await User.findOne({ _id: verifyToken._id });
        if (!userInfo) { console.log("User Invalid"); }
        else {
            await User.updateOne({ _id: verifyToken._id }, { $push: { tests: newTest } })
            res.status(200).send('true');
        }

        console.log("Done");
    }
    catch (err) { console.log(err); }
}

module.exports.result = async (req, res) => {
    try {
        const token = req.cookies.eLearning;
        console.log("in");
        console.log(req.body.testId);
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        await TestAns.findOne({ $and: [{ userId: verifyToken._id }, { TestId: req.body.testId }] }, async (e, info) => {
            if (e) { console.log(e) };
            if (!info)
                res.status(404).send("false");
            else {
                res.status(200).send(JSON.stringify(info));
                console.log("Info: " + info);
            }
        });
    } catch (err) { console.log(err) }
}

module.exports.signout = async (req, res) => {
    res.clearCookie('eLearning');
    res.status(200).send("Logged Out");
}


