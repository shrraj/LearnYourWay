import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
const { tests } = require('./Ques');

function Result() {
    const [userData, setUserData] = useState([]);
    const [answers, setAnswers] = useState([]);
    const location = useLocation();
    const testId = location.state[0].testId + 1;
    const feed = { testId };
    async function getResult() {
        try {
            const res = await fetch('/result', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(feed),
                credentials: 'include'

            });
            const data = await res.json();

            if (!data)
                console.log("Unsuccessful");
            else {
                setUserData(data);
                setAnswers(data.userAnswers);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getResult();
    }, []);

    return (
        <div>
            <h1>Your Score is : {userData.score}</h1>
            <table className=" ms-4 me-1 table table-bordered">
                <thead className="table-dark">
                    <tr className="col-4">
                        <th className="col-2">Q No</th>
                        <th className="col-4">Your Answer</th>
                        <th className="col-4">Correct Answer</th>
                    </tr>
                </thead>

                {answers.map((value, index) => (
                    <tbody key={index} className={(value === tests[testId - 1].questions[index].answer) ?
                        'table-success' : value !== '' ? 'table-danger' : 'table-primary'}>
                        <tr>
                            <td className='col-4'>{index}</td>
                            <td className="col-4">{value}</td>
                            <td className="col-4">{tests[testId - 1].questions[index].answer}</td>
                        </tr>
                    </tbody>))}
            </table>
        </div>
    );
}

export default Result;