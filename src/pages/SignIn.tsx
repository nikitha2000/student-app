import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Form from "../component/UserForm";
import { User } from "../type/user";

const SignIn = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit = async (user: User) => {
    setIsSubmitting(true);

    try {
      const existingUserResponse = await axios.get(
        `http://localhost:3000/users?username=${user.username}`
      );
      if (existingUserResponse.data.length) {
        setErrorMessage("Username is already taken. Please choose another.");
        setIsSubmitting(false);
        return;
      }

      const response = await axios.post("http://localhost:3000/users", user);

      if (response.status === 201) {
        alert("User created successfully!");
        navigate("/");
      }
    } catch (error) {
      setErrorMessage("Error creating user. Please try again.");
      console.error("Error creating user:", error);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="font-black text-4xl text-gray-900 pb-8 tracking-wide uppercase">
        United Indian School
      </h1>
      <div className="w-full max-w-sm p-8 space-y-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          Create New User
        </h2>
        <Form
          onSubmit={handleSubmit}
          errorMessage={errorMessage}
          isSubmitting={isSubmitting}
          buttonText="Create User"
        />
      </div>
    </div>
  );
};

export default SignIn;
