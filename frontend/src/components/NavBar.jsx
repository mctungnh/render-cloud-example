import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function NavBar() {
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
                        <li className="nav-item">
                            <a className="nav-link" href="/login">Login</a>
                        </li>
                        <li className="nav-item">
                            <a class="btn btn-warning" href="/signup" role="button">Sign up</a>
                        </li>
                    </ul>
                </div>
            </div>
            </nav>
    );
}

export default NavBar;