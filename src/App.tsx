import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
import HomePage from "./pages/HomePage";
import Teachers from "./pages/Teachers";
import StudentList from "./pages/StudentList";
import { RoutePaths } from "./route/path";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={RoutePaths.Home} element={<Login />} />
        <Route path={RoutePaths.SignIn} element={<SignIn />} />
        <Route path={RoutePaths.HomePage} element={<HomePage/>} />
        <Route path={RoutePaths.Teachers} element={<Teachers/>} />
        <Route path={RoutePaths.StudentList} element={<StudentList/>} />
      </Routes>
    </Router>
  );
};

export default App;
