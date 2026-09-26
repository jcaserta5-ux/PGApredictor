# PGA Predictor - Quick Start Guide

## Prerequisites
- Python 3.9+
- Node.js 18+
- npm

## Run the MVP

### Backend (Terminal 1)
```bash
cd backend
python -m venv venv
source venv/bin/activate    # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```
Backend runs on: **http://localhost:5000**

### Frontend (Terminal 2)
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on: **http://localhost:5173**

## What You'll See
- A dashboard with 6 sample PGA golfers
- Power rankings based on form and course fit
- Betting lines and implied probabilities
- Edge calculations showing where the model has an advantage
- Recommendations: "Strong bet", "Lean", or "Pass"
- Fully responsive design for mobile and desktop

## What's Demo Data
- All golfer names, rankings, and statistics are sample data
- Betting odds are sample numbers
- Edge calculations are based on the demo predictions

## Next Steps
1. Connect to real PGA Tour data APIs
2. Build predictive model based on historical performance
3. Integrate live betting odds from sportsbooks
4. Deploy to Railway (backend) and Vercel (frontend)
5. Add user accounts and saved bets

## Project Structure
```
PGApredictor/
├── backend/
│   ├── app.py              # Flask API
│   ├── requirements.txt     # Python dependencies
│   └── .env.example         # Config template
└── frontend/
    ├── src/
    │   ├── App.jsx          # Main component
    │   ├── App.css          # Styling
    │   └── main.jsx         # Entry point
    ├── package.json         # NPM dependencies
    ├── vite.config.js       # Vite config
    └── index.html           # HTML template
```
