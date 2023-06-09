import React, {useState} from "react";
import {
  Routes,
  Route,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import FeedForm from "./components/FeedForm";

function App() {
    return (
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<FeedForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
        </Routes>
      </div>
    )
}

export default App;
