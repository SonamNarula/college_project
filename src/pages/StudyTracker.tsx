import React, { useState } from 'react';
import { StudyLog } from '../types';
import EmptyState from '../components/EmptyState';

const PlusIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <line x1="12" y1="5" x2="12" y2="19" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="5" y1="12" x2="19" y2="12" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

const TrashIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polyline points="3 6 5 6 21 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 11v6M14 11v6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface StudyTrackerProps {
  studyLogs: StudyLog[];
  streak: number;
  onAddLog: (date: string, hours: number, dsaQuestions: number) => void;
  onDeleteLog: (date: string) => void;
}

const StudyTracker: React.FC<StudyTrackerProps> = ({ studyLogs, streak, onAddLog, onDeleteLog }) => {
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);
  const [hours, setHours] = useState('');
  const [dsa, setDsa] = useState('');

  const handleAdd = () => {
    const h = parseFloat(hours);
    const d = parseInt(dsa, 10);
    if (!date || isNaN(h) || h <= 0) return;
    onAddLog(date, h, isNaN(d) ? 0 : d);
    setHours('');
    setDsa('');
    setDate(today);
  };

  const totalHours = studyLogs.reduce((s, l) => s + l.hours, 0);
  const totalDSA = studyLogs.reduce((s, l) => s + l.dsaQuestions, 0);
  const avgHours =
    studyLogs.length > 0 ? (totalHours / studyLogs.length).toFixed(1) : '0';

  const sortedLogs = [...studyLogs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="page-enter">
      {/* Streak Banner */}
      <div className="streak-banner">
        <div>
          <div className="streak-count">{streak}</div>
          <div className="streak-label">Day Streak 🔥</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '1.5rem', fontFamily: 'var(--font-head)', color: 'rgba(255,255,255,0.9)' }}>
            {totalHours}h
          </div>
          <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Total hours logged</div>
          <div style={{ marginTop: '0.5rem', fontSize: '1rem', fontFamily: 'var(--font-head)', color: 'rgba(255,255,255,0.9)' }}>
            {totalDSA} DSA
          </div>
          <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Questions solved</div>
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { value: `${avgHours}h`, label: 'Avg Hours/Day' },
          { value: studyLogs.length, label: 'Active Days' },
          { value: totalDSA, label: 'DSA Problems' },
        ].map((s) => (
          <div key={s.label} className="card" style={{ padding: '1.25rem', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-head)', fontSize: '1.5rem', color: 'var(--accent-5)', marginBottom: '0.25rem' }}>
              {s.value}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Log Form */}
      <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <div className="section-header" style={{ marginBottom: '1rem' }}>
          <h3 className="section-title">Log Study Session</h3>
        </div>
        <div className="study-form">
          <div className="form-group">
            <label className="form-label">Date</label>
            <input
              className="input-field"
              type="date"
              value={date}
              max={today}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Hours Studied</label>
            <input
              className="input-field"
              type="number"
              placeholder="e.g. 3.5"
              min="0.5"
              max="24"
              step="0.5"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">DSA Questions</label>
            <input
              className="input-field"
              type="number"
              placeholder="e.g. 5"
              min="0"
              value={dsa}
              onChange={(e) => setDsa(e.target.value)}
            />
          </div>
          <div className="form-group" style={{ justifyContent: 'flex-end' }}>
            <button className="btn btn-primary w-full" onClick={handleAdd}>
              <PlusIcon /> Log Session
            </button>
          </div>
        </div>
      </div>

      {/* Weekly Logs Table */}
      <div>
        <div className="section-header">
          <h3 className="section-title">Study Logs</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {studyLogs.length} sessions recorded
          </span>
        </div>

        {sortedLogs.length === 0 ? (
          <EmptyState
            icon="📚"
            title="No study sessions yet"
            description="Log your first study session above to start tracking your progress."
          />
        ) : (
          <div className="card" style={{ overflow: 'hidden' }}>
            <table className="study-logs-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Hours</th>
                  <th>DSA Questions</th>
                  <th>Performance</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {sortedLogs.map((log) => {
                  const perf = log.hours >= 4 ? 'Excellent' : log.hours >= 2 ? 'Good' : 'Low';
                  const perfColor =
                    log.hours >= 4 ? '#22c55e' : log.hours >= 2 ? '#eab308' : '#ef4444';
                  return (
                    <tr key={log.date}>
                      <td>
                        {new Date(log.date + 'T00:00:00').toLocaleDateString('en-IN', {
                          weekday: 'short',
                          day: 'numeric',
                          month: 'short',
                        })}
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{ flex: 1, height: '4px', background: 'var(--bg-secondary)', borderRadius: '100px', maxWidth: '80px' }}>
                            <div
                              style={{
                                width: `${Math.min((log.hours / 8) * 100, 100)}%`,
                                height: '100%',
                                background: 'var(--gradient)',
                                borderRadius: '100px',
                              }}
                            />
                          </div>
                          <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{log.hours}h</span>
                        </div>
                      </td>
                      <td style={{ fontWeight: 500 }}>{log.dsaQuestions}</td>
                      <td>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: perfColor }}>
                          {perf}
                        </span>
                      </td>
                      <td>
                        <button
                          className="task-delete"
                          onClick={() => onDeleteLog(log.date)}
                          aria-label="Delete log"
                        >
                          <TrashIcon />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyTracker;
