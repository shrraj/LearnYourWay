import React, { useState, useEffect } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../index.css';
import { NavLink } from "react-router-dom";

function Navbar() {
    const [login, setLogin] = useState(false);
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
            if (res.status === 200)
                setLogin(true);
            if (!res.status === 200)
                throw new Error(res.error);
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        callMyDetails();
    });

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
                <div className="container-fluid">
                    <label className="navbar-brand">e-Learning</label>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse " id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">Home</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/home">Practice</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/signin">SignIn</NavLink>
                            </li>
                            {login === true ?
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/signout" onClick={() => setLogin(false)}>SignOut</NavLink>
                                </li>
                                :
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/signup">SignUp</NavLink>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;