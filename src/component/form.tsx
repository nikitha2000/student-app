import React, { useState } from "react";
import {User} from "../type/user"

interface FormProps {
  onSubmit: (user: User) => void;
  errorMessage: string;
  isSubmitting: boolean;
  buttonText: string;
}

const Form: React.FC<FormProps> = ({ onSubmit, errorMessage, isSubmitting, buttonText }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({username, password});
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value); 
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value); 
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="username" className="block text-gray-600">
          Username
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
          className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-gray-600">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      {errorMessage && (
        <div className="text-red-600 text-center pt-2">{errorMessage}</div>
      )}

      <button
        type="submit"
        className="w-full p-3 mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Processing..." : buttonText}
      </button>
    </form>
  );
};

export default Form;
