import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import LoginButton from "./LoginButton";
import { useAuth0 } from "@auth0/auth0-react";

function NavBar() {
    const {
        user,
        isAuthenticated,
        loginWithRedirect,
        logout,
    } = useAuth0();

    const logoutWithRedirect = () =>
    logout({
        logoutParams: {
          returnTo: window.location.origin,
        }
    });

    return (
        <nav className="navbar navbar-expand-sm">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Dev Showcase</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="mynavbar">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/">Feed</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">Your Showcase</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        {!isAuthenticated && (
                            <li className="nav-item">
                                <button
                                    id="qsLoginBtn"
                                    color="primary"
                                    className="btn btn-warning btn-margin"
                                    onClick={() => loginWithRedirect()}
                                >
                                    Log in
                                </button>
                            </li>
                        )}
                        {isAuthenticated && (
                            <li className="nav-item">
                                <div class="dropdown">
                                    <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {user.name}
                                    </a>

                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                        {/* <a className="dropdown-item" href="/profile">Profile</a> */}
                                        <a className="dropdown-item" style={{"color": "black"}} href="#" onClick={() => logoutWithRedirect()}>Log out</a>
                                    </div>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
            </nav>
    );
}

export default NavBar;