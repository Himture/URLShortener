import { useState, useEffect } from "react";
import { authenticate } from "../logic/auth";
import { allUserURL } from '../logic/gql'


export default function CreateLink() {
  const [link, setlink] = useState(null);
  const [some, setsome] = useState()
  const [token, setoken] = useState();

  useEffect(() => {
    async function getToken() {
      const token = await authenticate().then(t => {setoken(t)})
    }
    async function getData() {
        const toke = await allUserURL("Himture","eyJraWQiOiIwS2FRWWNwb1wvYUY5TzVDRjNvbUtLc3hMdHh2VlNSWW5rcnhJQ2p4cGJlMD0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhODQ5MWQwMy00Mjk3LTQ0MDAtOTcyMC05OWY5MTg1ZjA3NTgiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGgtMS5hbWF6b25hd3MuY29tXC9hcC1zb3V0aC0xX09ja1hQTklGbCIsImNsaWVudF9pZCI6IjNpOWV1b2g0NnA3a3Nvb2lvOTEzOTVzcmFpIiwib3JpZ2luX2p0aSI6IjFiYWY3MmEwLTk2NzUtNDVkNy1iMDM3LTljMjNhNTE0YjViNSIsImV2ZW50X2lkIjoiN2UyMGYxYjAtNjQwMS00NmZmLWJmODEtOGUxYTBiZDk4OGQ4IiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTY3NzA2NTk2NywiZXhwIjoxNjc3MDY5NTY3LCJpYXQiOjE2NzcwNjU5NjcsImp0aSI6IjliYTk2OGJlLWFlYTEtNDNmYi1iYTViLTgyMDM5NTIzZTAyOCIsInVzZXJuYW1lIjoiaGltdHVyZXMifQ.ODzeZnXVhfHPvnDtayzv8Kp86tZxjHXlNTqjjCkldud5MDJUmuv17PMkgHDmojsh-B0dU0dgDwVKuAjFBe0t8giqQcopBsvLKk0sbkZTCZtO_43mXOFjKHzwN3cWpvcE0hsO-5K-0OZRpzVyZAwQ8k27K4nIZuTltn31GGZ2QRR6eO72r5COWTXcAJTJbTB3bg-NJ9biGwyyQgawRsxUX1_Tnrsh9J44lTxMPfuRqHHFpNHl0kkxes3eyHr4NAlZsCOl6qZJ7GFCAXMJ08yng9R4G-gmU8eOppfd1F88zFZS-quiqoYmN3lvnBoVT6DAku0H3gkq5-K1OCDkee3REA").then((t) => 
        {setsome(t)})
    }
    getToken()
    getData()
  }, [])

  console.log(token,some)

  if (token) {
    return (
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-slate-500">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-purple-700">
            Enter Link to Shorten
          </h1>
          <form className="mt-6">
            <div className="mb-2">
              <label
                htmlfor="Link"
                className="block text-sm font-semibold text-gray-800"
              ></label>
              <input
                type="Link"
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mt-6">
              <button
                onClick={create}
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              >
                Shorten
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    return <h1>You have to be logged in</h1>;
  }
}

async function create() {
  const myQuery = `
    mutation {
        addUrl(username: "sanji", oLink: "sanji.com", sLink: "san")
    }
    `;
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(myQuery),
  };

  
  const res = fetch("https://graphql.himanshuoslash.workers.dev", options);
  console.log(res);
}
