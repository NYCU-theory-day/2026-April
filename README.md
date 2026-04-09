# NYCU Theory Day 2026 Website

This repository contains the official website for **NYCU Theory Day – April 2026**, including both the production site and a development preview.

## 🌐 Live Websites

### Main (Production)
Official public website:  
https://nycu-theory-day.github.io/2026-April/

### Dev (Preview)
Development and review version:  
https://nycutheorydaydev.netlify.app

> The dev version may include unfinished or experimental features.  
> Only the main website should be shared publicly.

## 🖥️ Run Locally (Desktop / VS Code / Codespaces)

You can preview the website locally using Python’s built-in HTTP server.

### Requirement
- Python 3

### Command
Run from the project root(dev for development):

    python -m http.server
​

## 🔄 Auto Update (No Ctrl+F5)

The site now includes client-side cache busting and periodic update checks.

- Shared fragments and CSV are requested with no-cache settings.
- The browser checks `site-version.json` every 2 minutes.
- If the version changes, the page reloads automatically.

When you update any website content (e.g., speaker info, schedule, text), also update the value of `version` in `site-version.json`.

Example:

```json
{
    "version": "2026-04-09-2"
}
```


## 🚀 Merge & Deployment

### Merge `dev` into `main`
When development is ready to go live, merge the `dev` branch into `main`:


    git checkout main
    git pull origin main
    git merge dev
    git push origin main
