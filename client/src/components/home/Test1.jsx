import React, { useState } from 'react';
import { useLocation, useHistory, Redirect } from 'react-router-dom';
const { tests } = require('./Ques');

function Test1() {
    const location = useLocation();
    const test_id = (location.state.mid) - 1;
    const test = tests[test_id].questions;
    const totalQues = tests[test_id].totalQues;
    const [start, setStart] = useState(false);
    const [index, setIndex] = useState(0);
    const [marks, setMarks] = useState(0);
    const [option, setOption] = useState('');
    const [userAnswers, setUserAnswers] = useState([]);
    const [correct, setCorrect] = useState(0);
    const [incorrect, setIncorrect] = useState(0);
    const [unattempted, setUnattempted] = useState(0);
    const history = useHistory();

    function onCheck() {
        setUserAnswers([...userAnswers, option]);
        if (test[index].answer === option) {
            setMarks(marks + 4);
            setCorrect(correct + 1);
        }
        else if (option === '') {
            setMarks(marks);
            setUnattempted(unattempted + 1);
        }
        else {
            setMarks(marks - 1);
            setIncorrect(incorrect + 1);
        }
        onSave();
    }

    function onSave(e) {
        if (index <= totalQues - 1)
            setIndex(index + 1);
        for (var i = 0; i < 4; i++)
            document.getElementsByName('options')[i].checked = false;
        setOption('');
    }

    async function submitTest() {
        const res =
            await fetch('/testans', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    TestId: test_id,
                    userAnswers: userAnswers,
                    score: marks,
                    correct: correct,
                    incorrect: incorrect,
                    unattempted: unattempted
                }),
                credentials: 'include'
            });
        const data = res.json();
        if (data)
            history.push({
                pathname: '/result',
                state: [{ testId: test_id }, { totalQues: totalQues }]
            });
    }
    function handleStart() {
        setStart(true);
    }

    return (

        <div>
            {start === false ?
                <div className="home-box custom-box">
                    <p className="inst">Instructions:</p>
                    <p>Read the instructions below carefully.</p>
                    <p>1. Number of Questions: 5</p>
                    {/* <p>2. Total Time: 30 Min</p> */}
                    <p>2. You cannot go back to previous question once you move ahead.</p>
                    <p>3. There is "No" time limit to complete test</p>
                    <button className="btn btn-success cntr" onClick={handleStart}>Start Quiz</button>
                </div> : ''}
            {start === true ?
                <div>
                    {index === totalQues ?
                        <div className="home-box custom-box">
                                 <h3>Would you like to submit Test?</h3>
                                <button className="btn btn-primary mt-3 mb-5" onClick={submitTest}>Submit</button>
                                <h3>Take another test?</h3>
                                <button className="btn btn-primary mt-3 mb-3" onClick={() => (history.push('/'))} >Home</button>
                        
                        </div>
                        : <div className='container-ques'>
                            <div className="question-number">Question {test[index].numb} </div>
                            <div className="question-box">
                                <label>{test[index].question}</label>
                            </div>
                            <div className="option-box">

                                <input type="radio" className="btn-check option-box" name="options" id="option1" onClick={() => { setOption(test[index].options[0]) }} />
                                <label className="btn btn-outline-primary option-box" htmlFor="option1">A. {test[index].options[0]}</label>
                            </div><div className="option-box">
                                <input type="radio" className="btn-check option-box" name="options" id="option2" onClick={() => { setOption(test[index].options[1]) }} />
                                <label className="btn btn-outline-primary option-box" htmlFor="option2">B. {test[index].options[1]}</label>
                            </div><div className="option-box">
                                <input type="radio" className="btn-check option-box" name="options" id="option3" onClick={() => { setOption(test[index].options[2]) }} />
                                <label className="btn btn-outline-primary option-box" htmlFor="option3">C. {test[index].options[2]}</label>
                            </div><div className="option-box">
                                <input type="radio" className="btn-check option-box" name="options" id="option4" onClick={() => { setOption(test[index].options[3]) }} />
                                <label className="btn btn-outline-primary option-box" htmlFor="option4">D. {test[index].options[3]}</label>
                            </div>
                            <button className="btn btn-primary ms-3 mt-4" onClick={onCheck}>Next</button>
                        </div>
                    }
                </div> : ''}
        </div>);
}


export default Test1;




