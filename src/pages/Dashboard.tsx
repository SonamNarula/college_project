import React, { useMemo } from 'react';
import { Task, StudyLog, PlacementApp } from '../types';
import { generateInsights } from '../utils/aiInsights';
import StatCard from '../components/StatCard';
import EmptyState from '../components/EmptyState';

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
};

const TaskIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polyline points="9 11 12 14 22 4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" strokeWidth="2"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" strokeWidth="2"/>
    <polyline points="12 6 12 12 16 14" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const FireIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" strokeWidth="2"/>
    <path d="M12 8c0 2-2 4-2 6s1 3 2 3 2-1 2-3-2-4-2-6z" strokeWidth="2"/>
  </svg>
);

const BriefcaseIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="2" y="7" width="20" height="14" rx="2" strokeWidth="2"/>
    <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" strokeWidth="2"/>
  </svg>
);

const BotIcon = () => (
  <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="3" y="11" width="18" height="11" rx="2" strokeWidth="2"/>
    <circle cx="12" cy="5" r="2" strokeWidth="2"/>
    <line x1="12" y1="7" x2="12" y2="11" strokeWidth="2" strokeLinecap="round"/>
    <line x1="8" y1="16" x2="8" y2="16" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="12" y1="16" x2="12" y2="16" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="16" y1="16" x2="16" y2="16" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

interface DashboardProps {
  tasks: Task[];
  studyLogs: StudyLog[];
  placements: PlacementApp[];
  streak: number;
}

const Dashboard: React.FC<DashboardProps> = ({ tasks, studyLogs, placements, streak }) => {
  const completedTasks = tasks.filter((t) => t.completed).length;
  const totalStudyHours = studyLogs.reduce((s, l) => s + l.hours, 0);
  const selectedPlacements = placements.filter((p) => p.status === 'selected').length;

  const last7StudyHours = useMemo(() => {
    const last7 = studyLogs.slice(-7);
    return last7.reduce((s, l) => s + l.hours, 0);
  }, [studyLogs]);

  const insights = useMemo(
    () => generateInsights(tasks, studyLogs, streak),
    [tasks, studyLogs, streak]
  );

  const recentTasks = tasks.slice(-5).reverse();

  return (
    <div className="page-enter">
      {/* Greeting */}
      <div className="dashboard-greeting">
        <h2 className="greeting-text">
          {getGreeting()}, Sonam 👋
        </h2>
        <p className="greeting-sub">
          {new Date().toLocaleDateString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <StatCard
          value={completedTasks}
          label="Tasks Completed"
          trend={`${tasks.length - completedTasks} pending`}
          icon={<TaskIcon />}
        />
        <StatCard
          value={`${totalStudyHours}h`}
          label="Total Study Hours"
          trend={`${last7StudyHours}h this week`}
          icon={<ClockIcon />}
        />
        <StatCard
          value={`${streak} 🔥`}
          label="Day Streak"
          trend={streak > 0 ? "Keep it going!" : "Start today"}
          icon={<FireIcon />}
        />
        <StatCard
          value={placements.length}
          label="Applications Sent"
          trend={`${selectedPlacements} selected`}
          icon={<BriefcaseIcon />}
        />
      </div>

      {/* AI Insights */}
      <div className="ai-insights-card">
        <div className="ai-badge">
          <BotIcon /> AI Productivity Coach
        </div>
        <h3 className="ai-insights-title">Your Personalized Insights</h3>
        {insights.length === 0 ? (
          <EmptyState icon="🤖" title="No data yet" description="Add tasks and study logs to get AI-powered insights." />
        ) : (
          insights.map((insight, i) => (
            <div key={i} className="insight-item">
              <span className="insight-number">{i + 1}.</span>
              <p className="insight-text">{insight}</p>
            </div>
          ))
        )}
      </div>

      {/* Recent Tasks */}
      <div>
        <div className="section-header">
          <h3 className="section-title">Recent Tasks</h3>
        </div>
        {recentTasks.length === 0 ? (
          <EmptyState
            icon="📋"
            title="No tasks yet"
            description="Head to Task Manager to add your first task."
          />
        ) : (
          <div className="task-list">
            {recentTasks.map((task) => (
              <div
                key={task.id}
                className={`task-item ${task.completed ? 'completed' : ''}`}
                style={{ cursor: 'default' }}
              >
                <div className={`task-checkbox ${task.completed ? 'checked' : ''}`}>
                  {task.completed && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
                <span className="task-title">{task.title}</span>
                <span className={`priority-badge priority-${task.priority}`}>{task.priority}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
