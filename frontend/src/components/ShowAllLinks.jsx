import { useState, useEffect } from "react";
import { authenticate } from "../logic/auth";
import { allUserURL, deleteUrl } from "../logic/gql";
import "./App.css";

export default function ShowAllLinks() {
  const [token, setoken] = useState();
  const [res, setRes] = useState();

  useEffect(() => {
    async function getToken() {
      const token = await authenticate().then((t) => {
        setoken(t);
      });
    }
    async function getData() {
      const data = await allUserURL(token).then((t) => {
        console.log(t.links);
        setRes(t.links);
      });
    }
    getToken();
    getData();
  }, []);

  const links = res?.map((links) => (
    <div className="item bg-white m-10 rounded-lg">
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
        onClick={handledelete}
          class="edit-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
    const res = await deleteUrl(event.target.value);
    window.alert(res);
    window.location.reload();
  } else {
    txt = "You pressed Cancel!";
  }
}

async function handledelete(event) {
  window.location.href = "/updatelink";
}