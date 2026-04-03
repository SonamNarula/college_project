import React, { useState } from 'react';
import { PlacementApp, PlacementStatus } from '../types';
import EmptyState from '../components/EmptyState';

const PlusIcon = () => (
  <svg widath="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

interface PlacementTrackerProps {
  placements: PlacementApp[];
  onAdd: (company: string, role: string, status: PlacementStatus, notes: string) => void;
  onDelete: (id: string) => void;
  onUpdateStatus: (id: string, status: PlacementStatus) => void;
}

const statusEmoji: Record<PlacementStatus, string> = {
  applied: '📨',
  interview: '🤝',
  selected: '🎉',
  rejected: '❌',
};

const PlacementTracker: React.FC<PlacementTrackerProps> = ({
  placements,
  onAdd,
  onDelete,
  onUpdateStatus,
}) => {
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState<PlacementStatus>('applied');
  const [notes, setNotes] = useState('');
  const [filterStatus, setFilterStatus] = useState<PlacementStatus | 'all'>('all');

  const handleAdd = () => {
    if (!company.trim() || !role.trim()) return;
    onAdd(company.trim(), role.trim(), status, notes.trim());
    setCompany('');
    setRole('');
    setStatus('applied');
    setNotes('');
  };

  const filtered =
    filterStatus === 'all'
      ? placements
      : placements.filter((p) => p.status === filterStatus);

  const counts = {
    all: placements.length,
    applied: placements.filter((p) => p.status === 'applied').length,
    interview: placements.filter((p) => p.status === 'interview').length,
    selected: placements.filter((p) => p.status === 'selected').length,
    rejected: placements.filter((p) => p.status === 'rejected').length,
  };

  return (
    <div className="page-enter">
      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        {(['applied', 'interview', 'selected', 'rejected'] as PlacementStatus[]).map((s) => (
          <div
            key={s}
            className="card"
            style={{ padding: '1.25rem', textAlign: 'center', cursor: 'pointer', border: filterStatus === s ? '1px solid var(--accent-4)' : undefined }}
            onClick={() => setFilterStatus(filterStatus === s ? 'all' : s)}
          >
            <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{statusEmoji[s]}</div>
            <div style={{ fontFamily: 'var(--font-head)', fontSize: '1.5rem', color: 'var(--text-primary)' }}>
              {counts[s]}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'capitalize', fontWeight: 500 }}>
              {s}
            </div>
          </div>
        ))}
      </div>

      {/* Add Form */}
      <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <div className="section-header" style={{ marginBottom: '1rem' }}>
          <h3 className="section-title">Add Application</h3>
        </div>
        <div className="placement-form">
          <div className="form-group">
            <label className="form-label">Company</label>
            <input
              className="input-field"
              type="text"
              placeholder="e.g. Google"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Role</label>
            <input
              className="input-field"
              type="text"
              placeholder="e.g. SDE Intern"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              className="input-field"
              value={status}
              onChange={(e) => setStatus(e.target.value as PlacementStatus)}
            >
              <option value="applied">📨 Applied</option>
              <option value="interview">🤝 Interview</option>
              <option value="selected">🎉 Selected</option>
              <option value="rejected">❌ Rejected</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Notes (optional)</label>
            <input
              className="input-field"
              type="text"
              placeholder="Any notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <div className="form-group" style={{ justifyContent: 'flex-end' }}>
            <button className="btn btn-primary w-full" onClick={handleAdd}>
              <PlusIcon /> Add Application
            </button>
          </div>
        </div>
      </div>

      {/* Filter + List */}
      <div>
        <div className="section-header">
          <h3 className="section-title">Applications</h3>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {filterStatus !== 'all' && (
              <button
                className="btn btn-ghost"
                style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
                onClick={() => setFilterStatus('all')}
              >
                Clear filter
              </button>
            )}
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {filtered.length} shown
            </span>
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon="💼"
            title="No applications yet"
            description="Start tracking your placement journey by adding your first application."
          />
        ) : (
          <div className="placement-grid">
            {filtered
              .slice()
              .reverse()
              .map((app, i) => (
                <div
                  key={app.id}
                  className="placement-item"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <div>
                    <div className="placement-company">{app.company}</div>
                    <div className="placement-role">{app.role}</div>
                    {app.notes && (
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                        {app.notes}
                      </div>
                    )}
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      {new Date(app.appliedDate).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
                    <select
                      className={`status-badge status-${app.status}`}
                      value={app.status}
                      onChange={(e) => onUpdateStatus(app.id, e.target.value as PlacementStatus)}
                      style={{ cursor: 'pointer', border: 'none', outline: 'none', background: 'transparent', fontFamily: 'var(--font-body)' }}
                    >
                      <option value="applied">📨 Applied</option>
                      <option value="interview">🤝 Interview</option>
                      <option value="selected">🎉 Selected</option>
                      <option value="rejected">❌ Rejected</option>
                    </select>

                    <button
                      className="task-delete"
                      onClick={() => onDelete(app.id)}
                      aria-label="Delete application"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlacementTracker;
