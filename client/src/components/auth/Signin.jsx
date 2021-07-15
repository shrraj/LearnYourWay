import React, { useState } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import img1 from '../images/img1.jpg';
import img2 from '../images/img2.png';
import '../../index.css';
import { NavLink, Link, useHistory } from "react-router-dom";

function Signin() {
    const [username, setUsername] = useState('');
    const [password, setPass] = useState('');
    const history = useHistory();
    function handleChangeUsername(e) {
        setUsername(e.target.value);
    }
    function handleChangePass(e) {
        setPass(e.target.value);
    }
    function forPass(e) {
        history.push('/forgotPass');
    }

    const feed = {
        username: username,
        password: password
    }

    async function handleSubmit(e) {
        if (feed.username === '' || feed.password === '')
            window.alert("One or more fields empty");
        else {
            const res = await fetch('/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(feed)
            });
            const data = await res.json();
            if (data === true) {
                history.push('/');
            }
            else if (data === false) {
                window.alert("Wrong Credentials");
                console.log("Wrong ");
            }
            else {
                window.alert("Not a user. Signup");
                history.push('/signup');
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
                            className='btn btn-success my-btn btn btn-primary btn-md'
                            style={{ marginLeft: '30%' }}
                            onClick={handleSubmit}> SignIn </button><br />
                        <NavLink to='/signup'
                            style={{ textDecoration: "none" }}
                            className="col-md-12 cen">Create an account? SignUp</NavLink><br />
                        <Link to='/forgotPass'
                            style={{ textDecoration: "none" }}
                            className="col-md-12 cen"
                            onClick={forPass}>Forgot Password?</Link>

                    </div>
                </div>
            </div>
        </div>

    );
}

export default Signin;