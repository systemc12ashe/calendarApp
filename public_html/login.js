const loginPage = (
    <div>
        <h1>Palendar Login</h1>
        <label for="username">Username</label>
        <input type="text" id="user" name="user"></input>
        <br></br>
        <br></br>
        <label for="password">Password</label>
        <input type="password" id="pass" name="pass"></input>
        <br></br>
        <br></br>
        <input type="submit" value="Log In"></input>
        <br></br>
        <p>
            Don't have an account?
            <br></br>
            <a href="signup.html">Click here to create an account.</a>
        </p>
    </div>
)

ReactDOM.render(
    loginPage, 
    document.getElementById("login")
);