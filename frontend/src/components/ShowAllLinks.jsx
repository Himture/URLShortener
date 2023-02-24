import { useState, useEffect } from "react";
import { authenticate } from "../logic/auth";
import { allUserURL, deleteUrl, incrementalSearch, updateUrl, getUsername } from "../logic/gql";
import "./App.css";

export default function ShowAllLinks() {
  const [token, setoken] = useState();
  const [res, setRes] = useState();
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function getToken() {
      await authenticate().then((t) => {
        setoken(t);
      });
    }
    getToken();
    console.log(search);
    if (!search) {
      async function getData() {
        await allUserURL(token).then((t) => {
          console.log(t.links);
          setRes(t.links);
        });
      }
      getData();
    } else {
      async function getData() {
        const data = await incrementalSearch(search)
        console.log(data)
        setRes(data)
      }
      getData();
    }
  }, [search]);

  function handleSearch() {
    setTimeout(300)
    const search = document.getElementById("default-search").value;
    setSearch(search);
    console.log("You clicked search");
  }
  console.log('i am here after search '+res)

  const links = res?.map((links) => (
    <div key={links.sLink} className="item bg-white m-10 rounded-lg">
      <div className="item-info">
        <p id={links.oLink} className="text-lg">
          <a href={"https://" + links.oLink} target="_blank">
            o/{links.sLink}
          </a>
        </p>
        <p id={links.sLink} className="text-sm">
          {links.oLink}
        </p>
        <p id={links.tag}>{links.tag}</p>
      </div>
      <div className="item-actions">
        <button
          value={links.sLink}
          onClick={handleEdit}
          className="edit-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Edit
        </button>
        <button
          value={links.sLink}
          onClick={handleChange}
          className="delete-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  ));

  if (token) {
    return (
      <>
        <div className=" bg-slate-500 p-2">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="mx-10 mt-10 relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              onChange={handleSearch}
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for shortlinks"
              required
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>

          <div className="flex flex-col min-h-screen stock-container">
            <ul>{links}</ul>
          </div>
        </div>
      </>
    );
  } else {
    return <h1>You have to be logged in</h1>;
  }
}

async function handleChange(event) {
  if (confirm("Are you sure")) {
    window.alert(event.target.value)
    const res = await deleteUrl(event.target.value);
    window.alert(res);
    window.location.reload();
  } else {
    txt = "You pressed Cancel!";
  }
}

async function handleEdit(event) {
  const sLink = event.target.value
  const val = prompt("Enter new link for o/"+sLink)
  const res = await updateUrl(sLink, val)
  window.alert(res)
}