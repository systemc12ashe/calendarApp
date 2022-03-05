const signupPage = (
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
            <a href="index.html">Click here to log in.</a>
        </p>
    </div>
)

ReactDOM.render(
    signupPage, 
    document.getElementById("signup")
);