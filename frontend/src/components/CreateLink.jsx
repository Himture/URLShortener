import { useState, useEffect } from "react";
import { authenticate } from "../logic/auth";
import { allUserURL } from '../logic/gql'
import { addUrl } from "../logic/gql";
import NotLogedIn from "./NotLogedIn";


export default function CreateLink() {
  const [token, setoken] = useState();
  const [oLink, setoLink] = useState()
  const [sLink, setsLink] = useState()
  const [tag, setTag] = useState()

  useEffect(() => {
    async function getToken() {
      const token = await authenticate().then(t => {setoken(t)})
    }
    getToken()
  }, [])

  async function onC(){
    const res = await addUrl(oLink, sLink, tag)
    window.alert(res)
    setoLink("")
    setsLink("")
   }

  if (token) {
    return (
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-slate-500">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-purple-700">
            Enter Link to Shorten
          </h1>
            <div className="mb-2">
              <label
                htmlFor="oLink"
                className="block text-sm font-semibold text-gray-800"
              >Original Link</label>
              <input
              id = "oLink"
                type="Link"
                onChange={(e) => setoLink(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="sLink"
                className="block text-sm font-semibold text-gray-800"
              >Short Link</label>
              <input
              id = "sLink"
                type="Link"
                onChange={(e) => setsLink(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="sLink"
                className="block text-sm font-semibold text-gray-800"
              >Tag (optional)</label>
              <input
              id = "tag"
                type="text"
                onChange={(e) => setTag(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mt-6">
              <button
                onClick={onC}
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              >
                Shorten
              </button>
            </div>
        </div>
      </div>
    );
  } else {
    return <NotLogedIn />
  }
}
