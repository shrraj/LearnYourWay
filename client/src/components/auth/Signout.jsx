import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Signin from './Signin';
import Navbar from '../home/Navbar';


function Signout() {
    const history = useHistory();
    const signout = async () => {
        try {
            const res = await fetch('/signout', {
                method: 'GET',
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json'
                },
                credentials: "include"
            });
            const data = await res.json();

            if (!res.status === 200)
                throw new Error(res.error);
        }
        catch (err) { console.log(err); }
    }

    useEffect(() => {
        signout();
    });

    return (
        <div>
            <Navbar />
            <Signin />
        </div>
    );
}

export default Signout;