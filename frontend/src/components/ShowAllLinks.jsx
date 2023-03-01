import { useState, useEffect } from "react";
import { authenticate } from "../logic/auth";
import {
  allUserURL,
  deleteUrl,
  incrementalSearch,
  updateUrl,
  addTag,
} from "../logic/gql";
import "./App.css";
import NotLogedIn from "./NotLogedIn";
import LoadingSpinner from "./LoadingSpinner";

export default function ShowAllLinks() {
  const [token, setoken] = useState();
  const [res, setRes] = useState();
  const [tags, settags] = useState();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("hidden");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getToken() {
      await authenticate().then((t) => {
        setoken(t);
      });
    }
    getToken();
    if (!search) {
      async function getData() {
        await allUserURL(token).then((t) => {
          setRes(t.links);
          const rectag = [...new Set(t.links?.map((links) => links.tag).flat()),];
          rectag.sort();
          settags(rectag);
          setIsLoading(false)
        });
      }
      getData();
    } else {    
      setIsLoading(true)
      let debounce = setTimeout(async () => {
        const data = await incrementalSearch(search);
        console.log("api call happened");
        console.log(data);
        setRes(data);
        setIsLoading(false)
      }, 500);
      return () => clearTimeout(debounce);
    }
  }, [search, activeTab]);

  function handleSearch(event) {
    const searching = event.target.value;
    setSearch(searching);
    console.log("You clicked search");
  }

  async function handleDelete(event) {
    if (confirm("Are you sure to delete o/" + event.target.value)) {
      const res = await deleteUrl(event.target.value);
      window.alert(res);
      window.location.reload();
    }
  }

  async function handleTag(event) {
    const sLink = event.target.value;
    const val = prompt("Enter the tag for o/" + sLink);
    if (val) {
      const res = await addTag(sLink, val);
      window.alert(res);
    }
  }

  async function handleEdit(event) {
    const sLink = event.target.value;
    const val = prompt("Enter new link for o/" + sLink);
    if (val) {
      const res = await updateUrl(sLink, val);
      window.alert(res);
    }
  }

  async function handleTab(event) {
    const tab = event.target.name;
    setActiveTab(tab);
  }

  const linkBox = (links) => (
    <div
      key={links.sLink}
      className={`tabcontent item bg-white m-10 rounded-lg`}
    >
      <div className="item-info flex-none">
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
          onClick={handleTag}
          className="edit-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Edit Tag
        </button>
        <button
          value={links.sLink}
          onClick={handleDelete}
          className="delete-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Delete
        </button>
      </div>
    </div>)

  const boxCheck = (
    <div>
      {res?.map((links) => {
        if (activeTab == links.tag && !search) {
          return linkBox(links);
        } else if (search) {
          return linkBox(links);
        }
      })}
    </div>
  );

  const links = (
    <div>
      <div className="flex">
        {tags?.map((tag) => {
          return (
            <div key={tag}>
              {!search ? (
                <button
                  name={tag}
                  onClick={handleTab}
                  className={"mt-10 ml-10 mb-0 " + (activeTab == tags ? "text-s" : "text-2xl")}
                >
                  {tag}
                </button>
              ) : (
                <></>
              )}
            </div>
          );
        })}
      </div>
      {boxCheck}
    </div>
  );

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
          <div className="min-h-screen stock-container">{isLoading ? <LoadingSpinner /> : links}</div>
        </div>
      </>
    );
  } else {
    return <NotLogedIn />;
  }
}
