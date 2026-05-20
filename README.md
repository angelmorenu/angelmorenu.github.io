Portfolio scaffold for Angel Morenu

Files created:
- `index.html` — main static page
- `styles.css` — simple responsive styles
- `script.js` — populates project cards and smooth scrolling

Professional template notes
- This version uses a University of Florida-inspired palette (UF blue + UF orange) with a clean, professional layout.
- The headshot slot is visible in the hero card. Save your photo at `portfolio/images/headshot.jpg` and refresh the page.

How to preview locally
1. Open a terminal in this folder (`/Users/angelhdmorenu/Documents/Resume/portfolio`)
2. Run a simple HTTP server (Python 3):

```bash
python3 -m http.server 8000
```

3. Open `http://localhost:8000` in your browser.

Deploy to GitHub Pages

Quick steps (recommended):

1. Create a new repository on GitHub called `angelmorenu.github.io` (this becomes a user site).
2. From this folder (`portfolio/`) copy files to a local repo folder, add a simple `images/` directory, and place your headshot at `images/headshot.jpg`.
3. Initialize git, commit, and push to GitHub. Example commands:

```bash
cd ~/Documents/Resume/portfolio
mkdir -p ../site-temp && cp -r * ../site-temp/  # copy files to a new local repo folder
cd ../site-temp
mkdir images || true
# (copy your headshot into images/ as images/headshot.jpg)
git init
git add .
git commit -m "Initial portfolio site"
# Create remote (option A: using GitHub CLI 'gh' - recommended if you have it):
gh repo create angelmorenu/angelmorenu.github.io --public --source=. --push
# Option B: manual remote setup - replace the URL with your new repo URL:
# git remote add origin https://github.com/angelmorenu/angelmorenu.github.io.git
# git branch -M main
# git push -u origin main
```

Notes:
- If you use the `gh` CLI command above, it will create the repo and push for you. If you don't have `gh`, follow Option B and push manually after creating the repo on GitHub.
- After pushing to `main` on a repo named `angelmorenu.github.io`, GitHub Pages will publish the site at `https://angelmorenu.github.io`. Give it a few minutes for the first build.
- If you prefer a project site instead of a user site, create a repo name of your choice and enable Pages in repo settings; serve from the `main` branch and `/ (root)`.
- If the headshot doesn't appear, confirm the file exists at `portfolio/images/headshot.jpg` and hard-refresh the browser.

Notes & next steps
- The CV link points to `../Angel_Morenu_Academic_CV_2026.pdf`. If you deploy the site as a repository root, upload the CV to the repo and update the path accordingly.
- I can help: automatically extract project descriptions from your CV, add images, or create separate project pages.
