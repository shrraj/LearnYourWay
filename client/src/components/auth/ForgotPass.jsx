import React, { useState } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../index.css';
import img1 from '../images/img1.jpg';
import img2 from '../images/img2.png';
import {useHistory } from "react-router-dom";

function ForgotPass() {
    const [username, setUsername] = useState('');
    const [password, setPass] = useState('');
    const history = useHistory();
    
    function handleChangeUsername(e) {
        setUsername(e.target.value);
    }
    function handleChangePass(e) {
        setPass(e.target.value);
    }

    const feed = {
        username: username,
        password: password
    }

    async function handleSubmit(e) {
        if (feed.username === '' || feed.password === '')
            window.alert("One or more fields empty");
        else {
            const res = await fetch('/forgotPass', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(feed)
            });
            const data = await res.json();
            if (data === true) {
                history.push('/signin');
            }
            else if (data === false) {
                window.alert("Invalid User");
                console.log("Invalid User");
                history.push('/signup');
            }
            else {
                window.alert("Something went wrong");
            }
        }
    }


    return (
        <div>
            <div className="container-fluid row">
                <div className=" container-fluid col-lg-8 col-md-12">
                    <img src={img1} alt="..." className='img1 ' />
                </div>
                <div className="col-lg-4 col-md-12">
                    <div className=" form-class" >
                        <img src={img2} alt="..." className='img2 ' />

                        <h2 className="ms-5 cen">SignIn</h2>
                        <input
                            type='string' placeholder='Username'
                            name="username"
                            className=" form-control form-control-lg one col-md-10"
                            onChange={handleChangeUsername}
                            value={username} />
                        <input
                            type='password'
                            placeholder='Password'
                            name="password"
                            className="form-control form-control-lg one col-md-10"
                            onChange={handleChangePass}
                            value={password} />
                        <button
                            type='submit'
                            className='btn btn-success my-btn btn-md'
                            style={{ marginLeft: '30%' }}
                            onClick={handleSubmit}> Change Password </button><br />
                    </div>
                </div>
            </div>
        </div>

        

    );
}


export default ForgotPass;


