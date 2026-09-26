from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Sample data for the MVP. We will replace this with real data ingestion later.
GOLFERS = [
    {'id': 1, 'name': 'Scottie Scheffler', 'rank': 1, 'form': 94, 'course_fit': 92},
    {'id': 2, 'name': 'Rory McIlroy', 'rank': 2, 'form': 88, 'course_fit': 90},
    {'id': 3, 'name': 'Xander Schauffele', 'rank': 3, 'form': 86, 'course_fit': 87},
    {'id': 4, 'name': 'Collin Morikawa', 'rank': 4, 'form': 82, 'course_fit': 89},
    {'id': 5, 'name': 'Ludvig Åberg', 'rank': 5, 'form': 84, 'course_fit': 83},
    {'id': 6, 'name': 'Tommy Fleetwood', 'rank': 6, 'form': 79, 'course_fit': 85},
]

EVENT = {
    'id': 1,
    'name': 'Sample PGA Championship',
    'course': 'Sample National Golf Club',
    'location': 'United States',
    'status': 'Demo data',
}

# Model probability is deliberately simple for the MVP:
# form and course fit are blended, then compared with sportsbook implied probability.
PREDICTIONS = [
    {'golfer_id': 1, 'odds': 450, 'model_probability': 0.205, 'rank_score': 93.2},
    {'golfer_id': 2, 'odds': 750, 'model_probability': 0.145, 'rank_score': 89.0},
    {'golfer_id': 3, 'odds': 1000, 'model_probability': 0.115, 'rank_score': 86.4},
    {'golfer_id': 4, 'odds': 1800, 'model_probability': 0.092, 'rank_score': 85.5},
    {'golfer_id': 5, 'odds': 2200, 'model_probability': 0.076, 'rank_score': 83.5},
    {'golfer_id': 6, 'odds': 3000, 'model_probability': 0.061, 'rank_score': 81.4},
]


def implied_probability(american_odds):
    if american_odds > 0:
        return 100 / (american_odds + 100)
    return abs(american_odds) / (abs(american_odds) + 100)


def build_predictions():
    golfers = {golfer['id']: golfer for golfer in GOLFERS}
    result = []
    for item in PREDICTIONS:
        golfer = golfers[item['golfer_id']]
        implied = implied_probability(item['odds'])
        edge = item['model_probability'] - implied
        expected_value = (item['model_probability'] * (item['odds'] / 100)) - (1 - item['model_probability'])
        recommendation = 'Strong bet' if edge >= 0.05 else 'Lean' if edge >= 0.02 else 'Pass'
        result.append({
            'golfer': golfer['name'],
            'event': EVENT['name'],
            'rank_score': item['rank_score'],
            'odds': item['odds'],
            'model_probability': item['model_probability'],
            'implied_probability': implied,
            'edge': edge,
            'expected_value': expected_value,
            'recommendation': recommendation,
        })
    return sorted(result, key=lambda prediction: prediction['edge'], reverse=True)


@app.get('/api/health')
def health():
    return jsonify({'status': 'healthy', 'message': 'PGA Predictor API is running'})


@app.get('/api/events')
def events():
    return jsonify([EVENT])


@app.get('/api/golfers')
def golfers():
    return jsonify(GOLFERS)


@app.get('/api/predictions')
def predictions():
    return jsonify(build_predictions())


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
