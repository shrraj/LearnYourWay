import React, { useState } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../index.css';
import img1 from '../images/img1.jpg';
import img2 from '../images/img2.png';
import { NavLink, useHistory } from "react-router-dom";

function Signup() {
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
            const res = await fetch('/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(feed)
            });
            const data = await res.json();
            if (data === true) {
                history.push('/');
            }
            else if (data === false) {
                window.alert("User exists Please Signin if not use another username");
                console.log("User exists");
                history.push('/signin');
            }
            else {
                window.alert("Something went wrong");
            }
        }
    }
    return (

        <div className="container-fluid row">
            <div className=" container-fluid col-lg-8 col-md-12">
                <img src={img1} alt="..." className='img1 ' />
            </div>
            <div className="col-lg-4 col-md-12">
                <div className="form-class" >
                    <img src={img2} alt="..." className='img2' />
                    <h2 className="ms-5 cen">SignUp</h2>
                    <input type='string' placeholder='username' className=" form-control form-control-lg one col-md-10"
                        onChange={handleChangeUsername} value={username} />
                    <input type='password' placeholder='Password' className="form-control form-control-lg one col-md-10"
                        onChange={handleChangePass} value={password} />
                    <button type='submit' className='btn btn-success my-btn cen btn-md' style={{ marginLeft: '30%' }}
                        onClick={handleSubmit}> SignUp </button> <br />
                    <NavLink to='/signin' style={{ textDecoration: "none" }} className="col-md-12 cen">Already a user? Signin</NavLink>
                </div>
            </div>
        </div>
    );
}

export default Signup;