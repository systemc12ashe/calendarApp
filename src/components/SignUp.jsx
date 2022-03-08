import React from "react";
import {Link} from "react-router-dom";

function SignUp() {
    return (
    <div>
            <h1>Palendar Sign Up</h1>
            <label for="uname">Username</label>
            <input type="text" id="uname" name="uname"></input>
            <br></br>
            <br></br>
            <label for="pass">Password</label>
            <input type="password" id="pass" name="pass"></input>
            <br></br>
            <br></br>
            <input type="submit" value="Log In"></input>
            <br></br>
            <p>
                Already have an account?
                <br></br>
                <Link to="/Login">Click here to log in.</Link>
            </p>
        </div>
    );
}

export default SignUp;