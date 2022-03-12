import React, {useRef, useState} from "react";
import { Alert } from "react-bootstrap"
import {Link, useNavigate} from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import './Style.css';

function Login() {

  const emailRef = useRef();
  const passwordRef = useRef();
  const {login, logout} = useAuth();
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit() {
    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/Calendar")
    } catch (error) {
      setError(error.message)
    }
    setLoading(false)
  }

  // async function handleLogout() {
  //   try {
  //     await logout();
  //     navigate("/Login")
  //   } catch (error) {
  //     setError(error.message)
  //   }
  // }

  return (
  <div>
    <h1>Palendar Login</h1>
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
  
    <input type="submit" value="Log In" onClick={handleSubmit} disabled={loading}></input>
    <br></br>
    <p>
      Need an account?
      <br></br>
      <Link to="/SignUp">Sign Up</Link>
    </p>
  </div>
  );
}

export default Login;