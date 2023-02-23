import { useState, useEffect } from "react";
import { authenticate } from "../logic/auth";
import { deleteUrl } from "../logic/gql";


export default function DeleteLink() {
  const [token, setoken] = useState();

  useEffect(() => {
    async function getToken() {
      const token = await authenticate().then(t => {setoken(t)})
    }
    getToken()
  }, [])

  if (token) {
    return (
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-slate-500">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-purple-700">
            Enter Link to Shorten
          </h1>
            <div className="mb-2">
              <label
                htmlFor="sLink"
                className="block text-sm font-semibold text-gray-800"
              >Short Link</label>
              <input
              id = "sLink"
                type="Link"
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mt-6">
              <button
                onClick={onC}
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              >
                Delete Link
              </button>
            </div>
        </div>
      </div>
    );
  } else {
    return <h1>You have to be logged in</h1>;
  }
}

async function onC(){
  const sLink = document.getElementById('sLink').value
  console.log(sLink)
  const res = await deleteUrl(sLink)
  window.alert(res)
 }