# avo-website
![site checks](https://github.com/owen-kellie-smith/avo-website/actions/workflows/site-checks.yml/badge.svg)

**Live site:** https://www.axe-vale-orchestra.co.uk/   [How?](#domain-name-management-info)

---

## How to contribute

To change anything, either create a new [issue](https://github.com/owen-kellie-smith/avo-website/issues) and describe what you would like to see or create what you would like to see and seek approval for it i.e.
1. [Fork the repository](#download-the-repo-and-run-tests)
2. Make your changes
3. Submit a pull request

The website is in the [docs](docs) folder.

If you are proposing an edit for an existing page then just go ahead and make the edit, commit your change and submit a pull request. 

If you are proposing a new page (e.g. `events`), you need to make **three** changes:

1. **Create the content fragment** e.g. copy `docs\contact.html` to `docs/events.html`  
   This file contains only the page content — no `<html>`, `<head>`, or `<body>` tags. Leave the redirect script at the very top so that visiting the file directly sends users to the correct page.  Your new page will look like (once you have finished):
   ```html
   <script data-redirect>location.replace('./index.html#events');</script>

   <h1>Events</h1>
   <p>New content that describes some events ...</p>
   ```

2. **Register the page** in `docs/js/import.js`  
   Add the new page key to both arrays near the top of the file:
   ```js
   const VALID_PAGES = ['latest', 'about', ..., 'events'];

   const PAGE_TITLES = {
     ...
     events: 'Axe Vale Orchestra - Events',
   };
   ```

3. **Add a menu link** in `docs/includes/menu.html`  
   Use a `href="#events"` hash link (not a `.html` file link):
   ```html
   <li><a href="#events">Events</a></li>
   ```

> **How it works:** The site is a single-page application. Only `docs/index.html` is ever loaded by the browser. Clicking a menu link changes the URL hash (e.g. `#events`), and the router in `docs/js/import.js` fetches the matching fragment file (`events.html`) and inserts its content into the page — no full page reload.

---

## Getting started with this repo

### Download the repo and run tests
```
git clone https://github.com/<your-github-user-name>/avo-website.git
cd avo-website
npm install
npx playwright install
npm run check
```

If everything works you will see something like (for each of several browsers)
```
✓ internal links and assets are valid
✓ homepage loads
✓ latest page loads via hash route
✓ about page loads via hash route
...
```

To view the site locally:
```
    npm start
```
then open `http://localhost:4173`

---
## Domain name management (info)
As a demo, [axe-vale-orchestra.co.uk is registered (at fasthosts), for a year until March 2027. Fasthosts DNS settings forward to Cloudflare.](https://www.whois.com/whois/axe-vale-orchestra.co.uk) Cloudflare has a CNAME for www(.axe-vale-orchestra.co.uk) which is owen-kellie-smith.github.io.  Github fowards to avo-website/docs via this repo > Settings > Pages (Custom Domain) which created [a CNAME in docs](docs/CNAME).

---
## License

MIT

---

## Authors

See GitHub contributors for the list of contributors to this project.

