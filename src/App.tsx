import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn"; 
import { RoutePaths } from "./route/path"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={RoutePaths.Home}element={<Login />} />
        <Route path={RoutePaths.SignIn} element={<SignIn />} />
      </Routes>
    </Router>
  );
};

export default App;
