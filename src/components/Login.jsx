import React from "react";
import {Link} from "react-router-dom";
  
function Login() {
  return (
    <div>
        <h1>Palendar Login</h1>
        <label htmlFor="username">Username</label>
        <input type="text" id="user" name="user"></input>
        <br></br>
        <br></br>
        <label htmlFor="password">Password</label>
        <input type="password" id="pass" name="pass"></input>
        <br></br>
        <br></br>
        <input type="submit" value="Log In"></input>
        <br></br>
        <p>
            Don't have an account?
            <br></br>
            <Link to="/SignUp">Click here to create an account.</Link>
        </p>
    </div>
  );
};

export default Login;