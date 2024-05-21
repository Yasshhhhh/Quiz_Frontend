import React, { useState, FormEvent } from 'react';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('yash');
  const [password, setPassword] = useState<string>('123');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submit");

    const user = { username, password };
    try {
      const response = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      if (response.status === 500) {
        console.log("WRONG");
        throw new Error('Server Error');
      } else if (response.status === 400) {
        alert("Invalid Credentials")
        window.location.href = "/login";
      } else if (response.status === 200) {
        const data = await response.json()
        const token = data.token
        console.log(token);
        localStorage.setItem('token', token);
        window.location.href = "/home";
      }

    } catch (error) {
      console.error('Server Error:', error);
      alert('Server Error');
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
      <form className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-sm w-full" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
          <input
            id="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your name"
            value={username}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
          <input
            type="password"
            id="password"
            value={password}
            placeholder="Password"
            onChange={handlePasswordChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <button
          type='submit'
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
        <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-400">Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Register here</a></p>
      </form>
    </div>
  );
};

export default Login;
