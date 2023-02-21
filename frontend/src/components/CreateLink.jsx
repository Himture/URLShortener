import { useState } from "react"

export default function CreateLink() {
    const [link, setlink] = useState(null)
    return(
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-slate-500">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-purple-700">
                   Enter Link to Shorten
                </h1>
                <form className="mt-6">
                    <div className="mb-2">
                        <label
                            for="Link"
                            className="block text-sm font-semibold text-gray-800"
                        >
                        </label>
                        <input
                            type="Link"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mt-6">
                        <button onClick={create} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                            Shorten
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

async function create( ) {

    const myQuery = `
    mutation {
        addUrl(username: "sanji", oLink: "sanji.com", sLink: "san")
    }
    `
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 
                'application/json;charset=utf-8'
        },
        body: JSON.stringify(myQuery)
    }

    const res = fetch("https://graphql.himanshuoslash.workers.dev",options )
    console.log(res)
    
}