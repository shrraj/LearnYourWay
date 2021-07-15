import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { PieChart } from 'react-minimal-pie-chart';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import '../../index.css';
import { Card3 } from '../Card';

import Navbar from '../home/Navbar';

function TestAnalysis() {
    const location = useLocation();
    const id = location.state.mid;
    const feed = { id };
    const [correct, setCorrect] = useState(0);
    const [incorrect, setIncorrect] = useState(0);
    const [unattempted, setUnattempted] = useState(0);
    const [score, setScore] = useState(0);
    const [scoreList, setScoreList] = useState([]);
    const info = [];

    const callMyAnalysis = async () => {
        try {
            const res = await fetch("/testAnalysis", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(feed),
                credentials: "include"
            });
            const op = await res.json();

            setCorrect(op.correct);
            setIncorrect(op.incorrect);
            setUnattempted(op.unattempted);
            setScore(op.score);
            setScoreList(op.info);

            if (!res.status === 200)
                throw new Error(res.error);
        }
        catch (err) {
            console.log(err);
        }

    }
    useEffect(() => {
        callMyAnalysis();
    }, []);

    for (var indx = 0; indx < scoreList.length; indx++) {
        info.push({ name: 'Attempt' + (indx + 1), score: scoreList[indx] });
    }
    return (
        <div className="dashboard container-fluid  ">
            <div className="row">
                <h1 className=" head col-md-4">Test Analysis</h1>
            </div>
            <div className="card mb-3 shadow-lg p-3 mt-5 bg-white rounded c1 " style={{ width: "100%" }}>
                <div className="row g-0">
                    <div className="col-md-6">
                        <div className="graph">
                            <LineChart width={500} height={300} data={info} margin={{ top: 10, right: 40, bottom: 50, left: 10 }} >
                                <Line type="monotone" dataKey="score" stroke="#8884d8" />
                                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                            </LineChart>
                        </div>
                    </div>
                    <div className="card mb-3 border-0 piechart" style={{ width: "40rem" }}>
                        <div className="row g-0">
                            <div className="col-md-6">
                                <PieChart className="pie"
                                    data={[
                                        { title: 'Correct', value: correct, color: '#37d67a' },// 520726
                                        { title: 'Incorrect', value: incorrect, color: '#ff8a65' },//#f47373
                                        { title: 'UnAttempted', value: unattempted, color: '#2ccce4' },
                                    ]}
                                />
                            </div>
                            <div className="col-md-6">
                                <div className="card-body">
                                    <h3 className="card-title">Recent Score :{score}</h3>
                                    <p className="card-text"><div className=" correct" />
                                        <h4 className="txtCol">Correct</h4></p>
                                    <p className="card-text"><div className=" incorrect" />
                                        <h4 className="txtCol">Incorrect</h4></p>
                                    <p className="card-text"> <div className="unattempted" />
                                        <h4 className="txtCol">UnAttempted</h4></p>
                                    {/* <p className="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> */}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className="card-body col-md-6" style={{ paddingLeft: '12%' }}>
                        <h4 className="card-text " >Progress Report</h4>
                        <p className="card-text">Your marks mapped to the attempts</p>
                            <p className="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                        </div> */}
                </div>

            </div>
        </div>);
}
//  <div className="container-fluid row">
//     <div className="col-md-4">
//         <h3 className="txtCol head">Your Score : {score}</h3>
//     </div>


//     <div className="col-md-9 col-sm-12">
//         <PieChart className="pie"
//             data={[
//                 { title: 'Correct', value: correct, color: '#37d67a' },// 520726
//                 { title: 'Incorrect', value: incorrect, color: '#ff8a65' },//#f47373
//                 { title: 'UnAttempted', value: unattempted, color: '#2ccce4' },
//             ]}


//         />

//     </div>
//     <div className="td col-md-3">
//         <tr>
//             <div className=" correct" />
//             <h4 className="txtCol">Correct</h4>
//         </tr>
//         <tr>
//             <div className=" incorrect" />
//             <h4 className="txtCol">Incorrect</h4></tr>
//         <tr>
//             <div className="unattempted" >
//                 <h4 className="txtCol">UnAttempted</h4></div></tr>
//     </div>


// </div>

// <div className="container-fluid">
//     <h2 className="txtCol" style={{marginLeft:'30%'}}>Your Progress for Test {id}</h2>
//     <div className="graph">
//     <LineChart width={400} height={300} data={info} margin={{ top: 10, right: 40, bottom: 5, left: 0 }} >
//         <Line type="monotone" dataKey="score" stroke="#8884d8" />
//         <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
//         <XAxis dataKey="name" />
//         <YAxis />
//         <Tooltip />
//     </LineChart>
//     </div>
// </div> 
// </div>);
//}

export default TestAnalysis;

