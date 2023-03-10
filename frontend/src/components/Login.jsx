import { React, useState, useEffect } from "react";
import { login } from "../logic/gql";
import { authenticate } from "../logic/auth";

export default function Login() {
  const [token, setoken] = useState("");
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")

  useEffect(() => {
    async function getToken() {
      const token = await authenticate().then((t) => {
        setoken(t);
      });
    }
    getToken();
  }, []);

  async function onC() {
    const res = await login(email, password);
    window.location = "/";
  }
  

  if (!token) {
    return (
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-slate-500">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
            Login
          </h1>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              onChange={(e) => setemail(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              onChange={(e) => setpassword(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <a href="#" className="text-xs text-purple-600 hover:underline">
            Forgot Password?
          </a>
          <div className="mt-6">
            <button
              onClick={onC}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Login
            </button>
          </div>

          <p className="mt-8 text-xs font-light text-center text-gray-700">
            {" "}
            Don't have an account?{" "}
            <a href="#" className="font-medium text-purple-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    );
  } else {
    return <>{(window.location = "/")}</>;
  }
}
