import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/UserForm";
import { RoutePaths } from "../route/path";
import { User } from "../type/user";
import { fetchUsers } from "../api";


const Login = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUsers = async () => {
      const usersList = await fetchUsers();
      setUsers(usersList);
    };
    loadUsers();
  }, []);

  const handleSubmit = (user: User) => {
    setIsSubmitting(true);

    const { username, password } = user;
    const foundUser = users.find(
      (user) => user.username === username && user.password === password
    );

    if (foundUser) {
      navigate("/home");
      setErrorMessage("");
    } else {
      setErrorMessage("Invalid username or password.");
    }

    setIsSubmitting(false);
  };

  const handleSignIn = () => {
    navigate(RoutePaths.SignIn);
    navigate(RoutePaths.SignIn);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="font-black text-4xl text-gray-900 tracking-wide uppercase pb-8">
        United Indian School
      </h1>
      <div className="w-full max-w-sm p-8 space-y-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          Student Login
        </h2>
        <Form
          onSubmit={handleSubmit}
          errorMessage={errorMessage}
          isSubmitting={isSubmitting}
          buttonText="Log In"
        />
        <div className="text-center mt-4">
          <p>
            Don't have an account?
            <span
              className="text-blue-600 cursor-pointer"
              onClick={handleSignIn}
            >
              Sign-In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
