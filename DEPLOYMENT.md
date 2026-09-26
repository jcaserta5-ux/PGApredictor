# PGA Predictor - Deployment Guide

## Deploy Backend to Fly.io

### Prerequisites
- Fly.io account (free signup at https://fly.io)
- Flyctl CLI installed (https://fly.io/docs/getting-started/installing-flyctl/)
- Git with your repo cloned locally

### Steps

1. **Install Flyctl**
   ```bash
   # macOS
   brew install flyctl
   
   # Linux
   curl -L https://fly.io/install.sh | sh
   
   # Windows
   iwr https://fly.io/install.ps1 -useb | iex
   ```

2. **Log in to Fly.io**
   ```bash
   flyctl auth login
   ```

3. **From your repo root, deploy**
   ```bash
   cd backend
   flyctl launch
   ```
   
   When prompted:
   - **App name:** `pga-predictor-api` (or your choice)
   - **Region:** `iad` (US East) or your preference
   - **Postgres:** No (we're not using a database yet)
   - **Deploy now?:** Yes

4. **Get your backend URL**
   ```bash
   flyctl status
   ```
   Look for the URL (will be like `https://pga-predictor-api.fly.dev`)

---

## Deploy Frontend to Vercel

### Steps

1. **Go to vercel.com and sign in with GitHub**

2. **Click "Add New" → "Project"**

3. **Import the PGApredictor repository**

4. **Configure:**
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

5. **Add Environment Variable:**
   - Name: `VITE_API_URL`
   - Value: `https://your-fly-io-url.fly.dev` (replace with your actual Fly.io URL)

6. **Click Deploy**

7. **Your frontend URL will look like:**
   ```
   https://pga-predictor.vercel.app
   ```

---

## Test the Deployment

1. Visit your Vercel frontend URL
2. You should see the PGA Predictor dashboard with sample data
3. Click "Refresh" to test the API connection
4. The predictions table should load

---

## Next Steps

1. **Connect real data sources**
   - PGA Tour API
   - Sportsbook odds APIs (DraftKings, FanDuel, etc.)

2. **Build a real predictive model**
   - Historical golfer performance
   - Course fit analysis
   - Weather and conditions impact

3. **Add database**
   - Fly.io offers free PostgreSQL databases
   - Store golfer stats, predictions, betting lines

4. **Track results**
   - Log all predictions
   - Compare predicted vs actual outcomes
   - Calculate model ROI

---

## Troubleshooting

**Frontend shows error connecting to API:**
- Make sure `VITE_API_URL` is set correctly in Vercel
- Check that Fly.io backend is deployed and running
- View backend logs: `flyctl logs` (from backend directory)

**Fly.io deployment fails:**
- Check that `Dockerfile` and `fly.toml` exist in backend folder
- Verify `requirements.txt` has all dependencies
- View deployment logs: `flyctl logs`

**Changes not showing up:**
- Vercel auto-deploys on GitHub push to `main`
- Fly.io auto-deploys on push if you set it up with GitHub
- Otherwise, run `flyctl deploy` from the backend folder

---

## Important Notes

- **Fly.io free tier:** Includes 3 shared CPU-1x containers and 3GB RAM total. Your Flask app will easily fit.
- **Vercel free tier:** Unlimited deployments, 100GB bandwidth/month
- **Both sleep policy:** Fly.io keeps apps running 24/7 on the free tier (unlike Render). Vercel serverless functions wake instantly.
- **Demo data:** Currently using sample predictions. Next phase: connect real golf data and validate the model.
