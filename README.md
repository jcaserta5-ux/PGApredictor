# PGA Predictor MVP

## Run the app locally

### Terminal 1: backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### Terminal 2: frontend
```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173. The MVP currently uses clearly labeled demo data. The next phase is connecting trustworthy golf and odds data sources and validating the model against historical results.
