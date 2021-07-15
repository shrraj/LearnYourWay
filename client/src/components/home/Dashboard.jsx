import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../../index.css';
import { modules } from './Module';
import { Card4 } from '../Card';

function Dashboard() {
    const history = useHistory();
    const [testIds, setTestIds] = useState([]);
    const callMyDashboard = async () => {
        try {
            const res = await fetch("/dashboard", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json'
                },
                credentials: "include"
            });
            const data = await res.json();
            setTestIds(data.testIds);
            if (!res.status === 200)
                throw new Error(res.error);
        }
        catch (err) {
            console.log(err);
            history.push('/signin');
        }
    }
    useEffect(() => {
        callMyDashboard();
    }, []);
    return (
        <div className="container-fluid">
            <div className='container-fluid home'>
                <h1 className='cntr colr'>Analyse your Performance</h1>
            </div>
            <div className=" container-fluid row " style={{marginTop:"-11rem"}}>
                {testIds.length !== 0 ?
                    <div className="testName  home  row row-cols-1 row-cols-md-3 g-4 ">{testIds.map((testId, indx) => (
                        <div key={indx}>
                            <Card4 title={modules[indx].title} content={modules[indx].body}
                                img="" button="Analyse Your Performance" link='/testAnalysis' mid={testId}
                                header="Frontend Module"
                                className="cards2  home container-fluid col-md-3" />
                        </div>
                    ))}
                    </div> :
                    <p className="notest">No tests found to analyze. Please appear for one</p>}
            </div>
        </div>
    );
}

export default Dashboard;