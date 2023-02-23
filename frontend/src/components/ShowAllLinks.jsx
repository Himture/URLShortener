import { useState, useEffect } from "react";
import { authenticate } from "../logic/auth";
import { allUserURL } from "../logic/gql";

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
        console.log(t.links)
        setRes(t.links);
      });
    }
    getToken();
    getData();
  }, []);


  if (token) {
    return <>
    <h1>Some data should have come</h1>
    <div className="stock-container">
        <ul>
            { res?.map(links => 
            <li key={links.sLink}>
                <p>{links.sLink}</p>
            <p>{links.oLink}</p>
            <span>{links.tag}</span>
            </li> )}
        </ul>
    </div>
    </>;
  } else {
    return <h1>You have to be logged in</h1>;
  }
}
