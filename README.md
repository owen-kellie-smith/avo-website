# avo-website

**Live site:** https://owen-kellie-smith.github.io/avo-website/

---

## How to contribute

The website is in the [docs](docs) folder.

To change anything, either create a new [issue](https://github.com/owen-kellie-smith/avo-website/issues) and describe what you would like to see or create what you would like to see and seek approval for it i.e.
1. Fork the repository
2. Make your changes
3. Submit a pull request

If you are proposing a new page then copy an existing page e.g. docs/index.html and add your new page to docs/includes/menu.html.

---

## Getting started with this repo

### Download the repo and run tests
```
git clone https://github.com/owen-kellie-smith/avo-website.git
cd avo-website
npm install
npx playwright install
npm run check
```

If everything works you will see something like
```
✓ homepage loads
✓ pages load
✓ internal links valid
Lighthouse scores:
Performance      90+
Accessibility    100
SEO              100
```

---
## Domain name management (info)
axe-vale-orchestra is registered (at fasthosts) as a demo, for a year until March 2027. Fasthosts DNS settings forward to Cloudflare. Cloudflare has a CNAME for www(.axe-vale-orchestra.co.uk) which is owen-kellie-smith.github.io.  Github fowards to avo-website/docs via this repo > Settings > Pages (Custom Domain).

---
## License

MIT

---

## Authors

See GitHub contributors for the list of contributors to this project.

