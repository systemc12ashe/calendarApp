import React, {useRef, useState} from "react";
import { Alert } from "react-bootstrap"
import {Link, useNavigate} from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import './Style.css';

function SignUp() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const {signup} = useAuth();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit() {
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Password does not match")
        }
        try {
            setError('');
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
            navigate("/Calendar")
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    return (
    <div>
        <h1>Palendar Sign Up</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        <label>Email</label>
        <div>
            <input type="email" ref={emailRef} required></input>
        </div>
        <br></br>
        <label>Password</label>
        <div>
            <input type="password" ref={passwordRef} required></input>
        </div>
        <br></br>
        <label>Password Confirmation</label>
        <div>
            <input type="password" ref={passwordConfirmRef} required></input>
        </div>
        <br></br>
        <input type="submit" value="Sign Up" onClick={handleSubmit} disabled={loading}></input>
        <br></br>
        <p>
            Already have an account?
            <br></br>
            <Link to="/Login">Log In</Link>
        </p>
    </div>
    );
}

export default SignUp;