# PGA Predictor

A web application that ingests PGA golfer and event data, calculates predictive power rankings, and identifies betting opportunities with edge.

## Quick Start

See [QUICKSTART.md](QUICKSTART.md) for setup instructions.

## Project Overview

PGA Predictor is an MVP (Minimum Viable Product) designed to:

1. **Ingest Data** - Collect PGA golfer stats, tournament info, and historical results
2. **Calculate Rankings** - Build power rankings based on form, course fit, and performance
3. **Compare Markets** - Pull betting lines and compare against model predictions
4. **Identify Edges** - Find bets where our model probability > implied market probability
5. **Make Predictions** - Surface recommendations with positive expected value

## Tech Stack

- **Frontend**: React 18 + Vite (lightning-fast dev environment)
- **Backend**: Python Flask with CORS support
- **Database**: SQLite for local dev, PostgreSQL for production
- **Deployment**: Railway (backend) + Vercel (frontend) — both have free tiers

## Features (MVP)

✅ Dashboard showing golfers and tournaments  
✅ Predictions table with power scores and edges  
✅ Filter by recommendation (Strong bet, Lean, Pass)  
✅ Responsive design for mobile and desktop  
✅ API endpoints for predictions, golfers, events  
✅ Sample data for immediate testing  

## Features (Coming)

- [ ] Real PGA Tour data ingestion
- [ ] Live sportsbook odds integration
- [ ] Advanced predictive model (Bayesian analysis, course history, etc.)
- [ ] User accounts and saved bets
- [ ] Betting performance tracking
- [ ] Historical backtesting dashboard
- [ ] Mobile app

## How It Works

### The Model (MVP)

For this MVP, the model is intentionally simple:

1. **Power Score** = blend of (recent form + course fit)
2. **Model Probability** = estimate of golfer's win chance
3. **Implied Probability** = calculated from sportsbook odds
4. **Edge** = model probability - implied probability
5. **Recommendation**:
   - "Strong bet" if edge >= 5%
   - "Lean" if edge >= 2%
   - "Pass" otherwise

### The API

**GET /api/predictions**  
Returns list of predictions with:
- Golfer name and power score
- Model vs market win probability
- Edge percentage
- Betting line (American odds)
- Recommendation

**GET /api/golfers**  
Returns all golfers in the database.

**GET /api/events**  
Returns current/upcoming events.

## Deployment

### Free Options

**Railway** (backend)
- Sign up: https://railway.app
- Connect GitHub repo
- Auto-deploys on push
- Free tier includes $5/month credits

**Vercel** (frontend)
- Sign up: https://vercel.com
- Import project
- Set root to `frontend/`
- Free tier unlimited

### Environment Variables

**Backend (.env)**
```
FLASK_ENV=production
PORT=5000
DATABASE_URL=postgresql://...
```

**Frontend (.env.production)**
```
VITE_API_URL=https://your-railway-backend.railway.app
```

## Contributing

Feel free to:
- Add sample data
- Improve the predictive model
- Connect real data sources
- Enhance the UI
- Fix bugs

## Disclaimer

This app is for **research and entertainment** only. Predictions are **not guaranteed**. Do not make betting decisions based solely on this model. Always do your own research.

## License

MIT
