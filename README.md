# Ashish Rana CV Portfolio

Personal CV and research portfolio website built with Jekyll. The site is bilingual (`EN`/`DE`), supports light/dark mode, and renders CV content from structured data files.

## Local Development

Install dependencies once:

```bash
bundle install
```

Build the site:

```bash
bundle exec jekyll build
```

Run a local server:

```bash
bundle exec jekyll serve --host 127.0.0.1 --port 8000
```

Then open:

```text
http://127.0.0.1:8000
```

## Updating Content

- General site metadata and links: `_data/site.yml`
- Navigation labels: `_data/navigation.yml`
- English CV content: `_data/cv.en.yml`
- German CV content: `_data/cv.de.yml`
- Publications: `_data/publications.yml`
- Profile image: `assets/img/profile/new-profile-picture-ashish-rana.jpeg`

After editing a data file, rebuild or restart the local Jekyll server. The HTML sections read from `_data`, so content updates are reflected automatically wherever the relevant include renders that data.

## Deployment

GitHub Pages is configured to deploy from the `master` branch and repository root. Push changes to `master`, then wait for GitHub Pages to rebuild.

The contact form markup is Netlify Forms compatible, but GitHub Pages does not process form submissions. To enable email routing, deploy this repo on Netlify and configure the `collaboration` form notification there.
