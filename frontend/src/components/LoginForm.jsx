import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function LoginForm() {
    return (
        <form className="log">
            <h1>Login</h1>

            <div className="form-outline mb-4">
                <input type="email" id="form2Example1" className="form-control" />
                <label className="form-label" for="form2Example1">Username</label>
            </div>

            <div className="form-outline mb-4">
                <input type="password" id="form2Example2" className="form-control" />
                <label className="form-label" for="form2Example2">Password</label>
            </div>

            <div className="row mb-4">
                <div className="col d-flex justify-content-center">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="form2Example31" checked />
                        <label className="form-check-label" for="form2Example31"> Remember me </label>
                    </div>
                </div>

                {/* <div className="col">
                <a href="#!">Forgot password?</a>
                </div> */}
            </div>

            <button type="button" className="btn-primary btn-block mb-4 mx-auto d-block btn">Log in</button>

            <div className="text-center">
                <p>Not a member? <a href="/signup">Register</a></p>
            </div>
        </form>
    );
}

export default LoginForm;