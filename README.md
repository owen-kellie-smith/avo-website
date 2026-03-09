# avo-website
![site checks](https://github.com/owen-kellie-smith/avo-website/actions/workflows/site-checks.yml/badge.svg)

**Live site:** https://owen-kellie-smith.github.io/avo-website/

---

## How to contribute

The website is in the [docs](docs) folder.

To change anything, either create a new [issue](https://github.com/owen-kellie-smith/avo-website/issues) and describe what you would like to see or create what you would like to see and seek approval for it i.e.
1. [Fork the repository](#download-the-repo-and-run-tests)
2. Make your changes
3. Submit a pull request

If you are proposing a new page then copy an existing page e.g. docs/index.html and add your new page to docs/includes/menu.html.

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
✓ internal links are not broken
✓ homepage loads
✓ pages load
```

To view the site locally:
```
    npm start
```
then open `http://localhost:4173`

---
## Domain name management (info)
As a demo, axe-vale-orchestra.co.uk is [registered (at fasthosts), for a year until March 2027. Fasthosts DNS settings forward to Cloudflare.](https://www.whois.com/whois/axe-vale-orchestra.co.uk) Cloudflare has a CNAME for www(.axe-vale-orchestra.co.uk) which is owen-kellie-smith.github.io.  Github fowards to avo-website/docs via this repo > Settings > Pages (Custom Domain).

---
## License

MIT

---

## Authors

See GitHub contributors for the list of contributors to this project.

