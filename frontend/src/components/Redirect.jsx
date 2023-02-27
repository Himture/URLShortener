

export default function handler(req, res) {
  const { pathname } = req.url;

  // Check if the pathname contains the string "/redirect-me"
  if (true) {
    Astro.redirect("https://google.com");
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


