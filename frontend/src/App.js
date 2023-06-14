import React, {useState} from "react";
import {
  Routes,
  Route,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import FeedForm from "./components/FeedForm";
import Profile from "./components/Profile";
import { useAuth0 } from "@auth0/auth0-react";

const App = () => {
    const { isLoading, error } = useAuth0();

    if (error) {
      return <div>Oops... {error.message}</div>;
    }

    if (isLoading) {
      return "Loading...";
    }

    return (
      <div>
        <NavBar />
        <Routes>
          <Route path="/" component={FeedForm} />
          <Route path="/profile" component={Profile} />
        </Routes>
      </div>
    )
}

export default App;
