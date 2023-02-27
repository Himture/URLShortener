import { useEffect, useState } from "react";
import { getURL } from "../logic/gql"

export default function Redirect() {
  const { link } = Astro.props;
  const [ oLink, setoLink ] = useState()

  useEffect(() => {
    async function getoLink() {
      await getURL(link).then((t) => {
        setoLink(t);
      });
    }
    getoLink()
  })
  console.log(oLink)

  // Check if the pathname contains the string "/redirect-me"
  if (oLink) {
    Astro.redirect(oLink);
  } else {
    return (
      <html>
        <head>
          <title>My Astro Site</title>
        </head>
        <body>
          <h1>Welcome to my site</h1>
        </body>
      </html>
    );
  }
}


