import React from "react";
import Login from "./pages/Login";
import "./App.css";

function App() {
  const handleLogin = (username: string, password: string) => {
    console.log("Login details:", username, password);
  };

  return (
    <div className="text-center">
      <Login onLogin = {handleLogin} />
    </div>
  );
}

export default App;
