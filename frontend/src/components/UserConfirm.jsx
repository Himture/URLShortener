import { useState, useEffect } from "react";
import { confirmUser } from "../logic/gql";

export default function ConfirmUser() {
  const [token, setoken] = useState();

  useEffect(() => {
    async function getToken() {
      const token = await authenticate().then((t) => {
        setoken(t);
      });
    }
    getToken();
  }, []);

  if (!token) {
    return (
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-slate-500">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
            Authentication
          </h1>
          <div className="mb-2">
            <label
              htmlFor="authCode"
              className="block text-sm font-semibold text-gray-800"
            >
              Username
            </label>
            <input
              id="username"
              type="username"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            <label
              htmlFor="authCode"
              className="block text-sm font-semibold text-gray-800"
            >
              Confirmation Code
            </label>
            <input
              id="code"
              type="password"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-6">
            <button
              onClick={onC}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Confirm Code
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return <>{(window.location = "/")}</>;
  }
}

async function onC() {
  const username = document.getElementById("username").value;
  const code = document.getElementById("code").value;
  const res = await confirmUser(username, code);
  window.alert(res);
  window.location = "/";
}
