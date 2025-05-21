import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "../src/component/Login";
import Home from "../src/component/Home";
import About from "../src/component/About";
import Contact from "../src/component/Contacts";
import Infor from "../src/component/InforAccount";
import Root from "./routes/Root";
import ForgotPasswordPage from "./component/ForgotPasswordPage";
import ResetPasswordPage from "./component/ResetPasswordPage";

// src/App.js

import React from 'react';

const App = () => {
  return <h1>Hello from App.js (Not used in Router setup)</h1>;
};

export default App;
