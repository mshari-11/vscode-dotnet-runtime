Render deployment quick guide
============================

1) Create a GitHub repository and push the project there.
   - Use the included `deploy_to_github.ps1` script or run the git commands manually.

2) Sign in to Render: https://dashboard.render.com
   - New -> Web Service -> Connect to GitHub and select your repo.

3) Settings recommended:
   - Branch: `main`
   - Build Command: (leave empty) or `npm install`
   - Start Command: leave empty (we have a `Procfile` with `web: node server.js`) or set to `node server.js`

4) Environment variables (Render -> Service -> Environment):
   - `ADMIN_USER` = admin (or other username)
   - `ADMIN_PASS` = (choose a strong password)

Render auto-deploy via GitHub Actions
------------------------------------
You can enable automatic deploys from this repository using GitHub Actions. I added a workflow `.github/workflows/deploy-to-render.yml` that triggers a Render deploy when `main` is pushed.

Steps to enable automatic deploys:
1. In Render, create a Web Service for this repo or note the Service ID for an existing service (it looks like `srv-xxxxx`).
2. In your GitHub repo: Settings → Secrets → Actions → New repository secret.
   - Name: `RENDER_API_KEY` Value: your Render API key (create in Render dashboard under Account → API Keys)
   - Name: `RENDER_SERVICE_ID` Value: the service id (e.g. `srv-xxxxx`)
3. Push to `main` (or merge a PR) to trigger the workflow. You can watch the Actions tab for logs.

If you prefer not to use the API key, you can still deploy via Render UI by connecting the repo in the Render dashboard.

5) Deploy and wait. After deploy, Render will provide an HTTPS URL.

6) Test:
   - Tracking link for user: `https://<your-app>.onrender.com/?id=test123`
   - Owner page (protected): `https://<your-app>.onrender.com/owner.html?id=test123` (use ADMIN_USER/ADMIN_PASS)

Notes:
- If you need persistent storage, replace `reports.json` with a proper database (Postgres, MongoDB). Render supports connecting to managed DB services.
- For quick testing on your phone, open the HTTPS URL and approve geolocation when prompted.
