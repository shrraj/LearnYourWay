import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { modules } from './Module';
import { Card2 } from '../Card';
import '../../index.css';
import homepage from '../images/homepage.jpeg';
import Navbar from './Navbar';


function Home() {
    const history = useHistory();
    const callMyDetails = async () => {
        try {
            const res = await fetch("/home", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json'
                },
                credentials: "include"
            });
            const data = await res.json();
            console.log(data);
            if (!res.status === 200)
                throw new Error(res.error);
        }
        catch (err) {
            console.log(err);
            history.push('/signin');
        }
    }
    useEffect(() => {
        callMyDetails();
    });
    return (
        <div>
            <Navbar />
            <div className='row container-fluid home'>
                <h2 className='txtCol col-md-3 detailHeading'><strong>India's largest learning platform for <strong>Web Development Students</strong>.</strong></h2>
                <img src={homepage} className='col-md-4'></img>
            </div>
            <div className="container-fluid row">
                {modules.map((module) => (
                    <div key={module.id} className='col' >
                        <Card2 title={module.title} content={module.body}
                            img="" button="Start Module" link='/content' mid={module.id}
                            header="Frontend Module" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;