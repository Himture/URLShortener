import { useState, useEffect, useRef } from "react";
import { authenticate } from "../logic/auth";
import {
  addUrl,
  allUserURL,
  deleteUrl,
  incrementalSearch,
  updateUrl,
  addTag,
  logout,
} from "../logic/gql";
import "./App.css";
import NotLogedIn from "./NotLogedIn";

export default function ShowAllLinks() {
  const [token, setoken] = useState();
  const [res, setRes] = useState();
  const [tags, settags] = useState();
  const [oLink, setoLink] = useState();
  const [sLink, setsLink] = useState();
  const [tag, setTag] = useState();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [creatingLink, setCreatingLink] = useState(false);
  const count = useRef(0);

  useEffect(() => {
    async function getToken() {
      await authenticate().then((t) => {
        setoken(t);
      });
    }
    getToken();
    if (!search) {
      setIsLoading(true);
      let debounce = setTimeout(async () => {
        await allUserURL(token).then((t) => {
          setRes(t.links);
          const rectag = [
            ...new Set(t.links?.map((links) => links.tag).flat()),
          ];
          rectag.sort();
          console.log("calling api");
          settags(rectag);
          count.current = 0;
          setIsLoading(false);
          setReload(false);
        });
      }, 300);
      return () => clearTimeout(debounce);
    } else {
      setIsLoading(true);
      let debounce = setTimeout(async () => {
        const data = await incrementalSearch(search);
        console.log("api call happened");
        console.log(data);
        setRes(data);
        setIsLoading(false);
        setReload(false);
        count.current = 0;
      }, 500);
      return () => clearTimeout(debounce);
    }
  }, [search, activeTab, reload]);

  function handleSearch(event) {
    const searching = event.target.value;
    count.current = 0;
    setSearch(searching);
    console.log("You clicked search");
  }

  async function handleLogout(event) {
    const res = await logout();
    window.alert(res);
    window.location.reload();
  }

  async function handleDelete(event) {
    if (confirm("Are you sure to delete o/" + event.target.id)) {
      const res = await deleteUrl(event.target.id);
      window.alert(res);
      setReload(true);
      setActiveTab("All");
    }
  }

  async function handleTag(event) {
    const sLink = event.target.id;
    const val = prompt("Enter the tag for o/" + sLink);
    if (val) {
      const res = await addTag(sLink, val);
      window.alert(res);
      setReload(true);
      setActiveTab("All");
    }
  }

  async function handleEdit(event) {
    const sLink = event.target.id;
    const val = prompt("Enter new link for o/" + sLink);
    if (val) {
      const res = await updateUrl(sLink, val);
      window.alert(res);
      setReload(true);
      setActiveTab("All");
    }
  }

  async function handleTab(event) {
    const tab = event.target.name;
    setActiveTab(tab);
  }

  async function handleAdd(event) {
    event.preventDefault();
    setCreatingLink(true);
  }

  async function closeAddURL() {
    setCreatingLink(false);
  }

  async function addURL() {
    console.log(oLink, sLink, tag);
    const res = await addUrl(oLink, sLink, tag);
    window.alert(res);
    setCreatingLink(false);
    setoLink("");
    setsLink("");
    setTag("");
    setReload(true);
  }

  const addNewURL = (
      <div className="animate-fade-in-down fixed flex items-center justify-center h-screen w-full bg-opacity-50 bg-slate-400">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
          <button className="float-right text-xl" onClick={closeAddURL}>
            x
          </button>
          <h1 className="text-3xl font-semibold text-center text-purple-700">
            Enter Link to Shorten
          </h1>
          <div className="mb-2">
            <label
              htmlFor="oLink"
              className="block text-sm font-semibold text-gray-800"
            >
              Original Link
            </label>
            <input
              id="oLink"
              type="Link"
              onChange={(e) => setoLink(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              required
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="sLink"
              className="block text-sm font-semibold text-gray-800"
            >
              Short Link
            </label>
            <input
              id="sLink"
              type="Link"
              onChange={(e) => setsLink(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              required
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="sLink"
              className="block text-sm font-semibold text-gray-800"
            >
              Tag (optional)
            </label>
            <input
              id="tag"
              type="text"
              onChange={(e) => setTag(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-6">
            <button
              onClick={addURL}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Shorten
            </button>
          </div>
        </div>
      </div>
  );

  const linkBox = (links) => {
    return (
      <div
        key={links.sLink}
        className={`h-16	tabcontent item bg-white m-5 rounded-lg group w-2/3`}
      >
        <img
          height="40"
          width="40"
          src={`http://favicon.yandex.net/favicon/${links.oLink}`}
        />
        <div className="item-info flex-none ml-5">
          <p id={links.oLink} className="text-sm">
            <a href={"https://" + links.oLink} target="_blank">
              o/{links.sLink}
            </a>
          </p>
          <p id={links.sLink} className="text-xs">
            {links.oLink}
          </p>
          <p id={links.tag} className="text-xs text-slate-500	">
            {links.tag}
          </p>
        </div>
        <div className="item-actions invisible group-hover:visible">
          <button onClick={handleEdit} className="m-2">
            <svg
              id={links.sLink}
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 overflow:visible"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                id={links.sLink}
                d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
              />
            </svg>
          </button>
          <button onClick={handleTag} className="m-2">
            <svg
              id={links.sLink}
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                id={links.sLink}
                fillRule="evenodd"
                d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button onClick={handleDelete} className="m-2">
            <svg
              id={links.sLink}
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                id={links.sLink}
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  };

  const boxCheck = (
    <div>
      <div className="hidden">{(count.current = 0)}</div>
      {res?.map((links) => {
        if (activeTab == "All" && !search) {
          console.log("showing all");
          count.current = count.current + 1;
          return linkBox(links);
        } else if (activeTab == links.tag && !search) {
          console.log("switch tab");
          count.current = count.current + 1;
          return linkBox(links);
        } else if (search) {
          console.log("entered search");
          count.current = count.current + 1;
          return linkBox(links);
        }
      })}
    </div>
  );

  const links = (
    <div>
      <div className="flex pb-0 border-b-2 mt-5">
        {!search ? (
          <div
            style={
              activeTab == "All"
                ? { borderBottom: "3px solid blue", color: "black" }
                : { color: "grey" }
            }
            className="ml-5 text-xs px-2 flex pb-5 justify-center"
          >
            <button name="All" onClick={handleTab} className={"text-md pt-0"}>
              All
            </button>
          </div>
        ) : (
          <></>
        )}
        {tags?.map((tag) => {
          return (
            <div key={tag}>
              {!search ? (
                <div
                  style={
                    activeTab == tag
                      ? { borderBottom: "3px solid blue", color: "black" }
                      : { color: "grey" }
                  }
                  className="ml-5 text-xs px-2 flex pb-5 justify-center"
                >
                  <button
                    name={tag}
                    onClick={handleTab}
                    className={"text-md pt-0"}
                  >
                    {" "}
                    {tag}{" "}
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
          );
        })}
      </div>
      {isLoading ? (
        <div className=" mt-10 flex items-center justify-center">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      ) : (
        <div className="links-container">
          <div className="pl-5 pt-5">
            <h1 className="text-sm text-gray-500">
              Showing {count.current} results.
            </h1>
          </div>
          <div className="mt-5">{boxCheck}</div>
        </div>
      )}
    </div>
  );

  if (token) {
    return (
      <>
        <div className="flex justify-center items-center p-5 border-b-2">
          <div className="w-1/2 mr-auto">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
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
                className="block h-10 w-full p-4 pl-10 text-sm text-gray-900 border-2 border-blue-700 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search"
                required
              />
            </div>
          </div>
          <div className="ml-auto flex items-center justify-center space-x-4">
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
            </button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
        {creatingLink && addNewURL}
        <div className="px-5 pt-5 pb-0 flex justify-center">
          <div className="mr-auto">
            <h1 className="text-3xl font-bold">Shortcuts</h1>
          </div>
          <div className="ml-auto">
            <button
              onClick={handleAdd}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center space-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 float-left mr-auto"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              <a className="text-sm">New Shortcut</a>
            </button>
          </div>
        </div>
        <div className="min-h-screen stock-container">{links}</div>
      </>
    );
  } else {
    return <NotLogedIn />;
  }
}
