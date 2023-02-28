import { useState, useEffect } from "react";
import { signup } from "../logic/gql";
import { authenticate } from "../logic/auth";

export default function SignUp() {
  const [token, setoken] = useState("")
  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [username, setusername] = useState("")

  useEffect(() => {
    async function getToken() {
      const token = await authenticate().then((t) => {
        setoken(t);
      });
    }
    getToken();
  }, []);

  async function onClick() {
  const res = await signup(name, email, password, username);
  window.alert("done");
  window.location = "/";
}

  if (!token) {
    return (
      <>
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-slate-500">
          <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
            <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
              Sign-Up
            </h1>
            <div className="mb-2">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-800"
              >
                Name
              </label>
              <input
                id="name"
                type="name"
                onChange={(e) => setname(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-gray-800"
              >
                Username
              </label>
              <input
                id="username"
                type="username"
                onChange={(e) => setusername(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
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
            <div className="mt-6">
              <button
                onClick={onClick}
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <>{(window.location = "/")}</>;
  }
}
