import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || ''
const moneyline = (odds) => (odds > 0 ? `+${odds}` : odds)
const percent = (value) => `${(value * 100).toFixed(1)}%`

function App() {
  const [event, setEvent] = useState(null)
  const [predictions, setPredictions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('All')

  const loadDashboard = async () => {
    try {
      setLoading(true)
      setError('')
      const [eventResponse, predictionResponse] = await Promise.all([
        axios.get(`${API_URL}/api/events`),
        axios.get(`${API_URL}/api/predictions`),
      ])
      setEvent(eventResponse.data[0])
      setPredictions(predictionResponse.data)
    } catch {
      setError('The dashboard could not connect to the API. Start the backend and try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadDashboard() }, [])

  const visiblePredictions = filter === 'All'
    ? predictions
    : predictions.filter((prediction) => prediction.recommendation === filter)

  return (
    <div>
      <header className="hero">
        <div className="hero-inner">
          <div>
            <div className="eyebrow">PGA PREDICTOR · MVP</div>
            <h1>Find the edge before you place a bet.</h1>
            <p>Simple, transparent golf predictions comparing our model with the market.</p>
          </div>
          <button className="refresh" onClick={loadDashboard}>↻ Refresh</button>
        </div>
      </header>

      <main>
        {event && <section className="event-card">
          <div>
            <div className="eyebrow dark">CURRENT EVENT · {event.status.toUpperCase()}</div>
            <h2>{event.name}</h2>
            <p>{event.course} · {event.location}</p>
          </div>
          <div className="disclaimer">For research and entertainment only.<br />Predictions are not guaranteed.</div>
        </section>}

        {error && <div className="error">{error}</div>}
        {loading ? <div className="empty">Loading predictions…</div> : <>
          <section className="summary-grid">
            <div><span>Golfers analyzed</span><strong>{predictions.length}</strong></div>
            <div><span>Strong bets</span><strong>{predictions.filter((p) => p.recommendation === 'Strong bet').length}</strong></div>
            <div><span>Best edge</span><strong>{predictions.length ? percent(predictions[0].edge) : '—'}</strong></div>
          </section>

          <section className="predictions-card">
            <div className="section-heading">
              <div><div className="eyebrow dark">MODEL OUTPUT</div><h2>Betting opportunities</h2></div>
              <select value={filter} onChange={(event) => setFilter(event.target.value)}>
                <option>All</option><option>Strong bet</option><option>Lean</option><option>Pass</option>
              </select>
            </div>
            <div className="table-wrap"><table>
              <thead><tr><th>Golfer</th><th>Power score</th><th>Model win %</th><th>Market win %</th><th>Edge</th><th>Line</th><th>Signal</th></tr></thead>
              <tbody>{visiblePredictions.map((prediction) => <tr key={prediction.golfer}>
                <td><strong>{prediction.golfer}</strong></td><td>{prediction.rank_score.toFixed(1)}</td><td>{percent(prediction.model_probability)}</td><td>{percent(prediction.implied_probability)}</td>
                <td className={prediction.edge > 0 ? 'positive' : ''}>{percent(prediction.edge)}</td><td>{moneyline(prediction.odds)}</td>
                <td><span className={`badge ${prediction.recommendation.toLowerCase().replace(' ', '-')}`}>{prediction.recommendation}</span></td>
              </tr>)}</tbody>
            </table></div>
            {!visiblePredictions.length && <div className="empty">No golfers match this filter.</div>}
          </section>

          <section className="how-it-works"><h2>How this MVP works</h2><p>It blends recent form and course fit into a power score, estimates a win probability, and compares that estimate with the implied probability in the betting line. A positive edge means the model probability is higher than the market probability.</p></section>
        </>}
      </main>
      <footer>Demo data is currently used. Real data sources and model validation come next.</footer>
    </div>
  )
}

export default App
