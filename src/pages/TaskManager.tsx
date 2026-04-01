import React, { useState } from 'react';
import { Task, Priority, TaskFilter } from '../types';
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
    <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" strokeWidth="2"/>
  </svg>
);

interface TaskManagerProps {
  tasks: Task[];
  onAdd: (title: string, priority: Priority) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskManager: React.FC<TaskManagerProps> = ({ tasks, onAdd, onToggle, onDelete }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [filter, setFilter] = useState<TaskFilter>('all');

  const handleAdd = () => {
    if (!title.trim()) return;
    onAdd(title.trim(), priority);
    setTitle('');
    setPriority('medium');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleAdd();
  };

  const filtered = tasks.filter((t) => {
    if (filter === 'completed') return t.completed;
    if (filter === 'pending') return !t.completed;
    return true;
  });

  const counts = {
    all: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    pending: tasks.filter((t) => !t.completed).length,
  };

  return (
    <div className="page-enter">
      {/* Add Task */}
      <div className="card" style={{ padding: '1.5rem', marginBottom: '1.75rem' }}>
        <div className="section-header" style={{ marginBottom: '1rem' }}>
          <h3 className="section-title">Add New Task</h3>
        </div>
        <div className="task-input-row">
          <input
            className="input-field"
            type="text"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <select
            className="input-field"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
          >
            <option value="low">🟢 Low Priority</option>
            <option value="medium">🟡 Medium Priority</option>
            <option value="high">🔴 High Priority</option>
          </select>
          <button className="btn btn-primary" onClick={handleAdd}>
            <PlusIcon /> Add Task
          </button>
        </div>
      </div>

      {/* Filter Tabs + Task Count */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <div className="filter-tabs">
          {(['all', 'pending', 'completed'] as TaskFilter[]).map((f) => (
            <button
              key={f}
              className={`filter-tab ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)} ({counts[f]})
            </button>
          ))}
        </div>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          {counts.completed}/{tasks.length} completed
        </span>
      </div>

      {/* Progress Bar */}
      {tasks.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ height: '6px', borderRadius: '100px', background: 'var(--bg-secondary)', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${(counts.completed / tasks.length) * 100}%`,
                background: 'var(--gradient)',
                borderRadius: '100px',
                transition: 'width 0.5s ease',
              }}
            />
          </div>
        </div>
      )}

      {/* Task List */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={filter === 'completed' ? '🎉' : '📋'}
          title={filter === 'completed' ? 'No completed tasks yet' : filter === 'pending' ? 'All caught up!' : 'No tasks yet'}
          description={
            filter === 'all'
              ? 'Add your first task above to get started.'
              : filter === 'pending'
              ? 'Great job! All tasks are completed.'
              : 'Complete some tasks to see them here.'
          }
        />
      ) : (
        <div className="task-list">
          {filtered.map((task, i) => (
            <div
              key={task.id}
              className={`task-item ${task.completed ? 'completed' : ''}`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <button
                className={`task-checkbox ${task.completed ? 'checked' : ''}`}
                onClick={() => onToggle(task.id)}
                aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
              >
                {task.completed && (
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
              <span className="task-title">{task.title}</span>
              <span className={`priority-badge priority-${task.priority}`}>{task.priority}</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                {new Date(task.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
              </span>
              <button className="task-delete" onClick={() => onDelete(task.id)} aria-label="Delete task">
                <TrashIcon />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskManager;
