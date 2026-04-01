import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Task, StudyLog, PlacementApp } from '../types';
import EmptyState from '../components/EmptyState';

ChartJS.register(
  CategoryScale, LinearScale, BarElement, PointElement,
  LineElement, ArcElement, Title, Tooltip, Legend, Filler
);

interface AnalyticsProps {
  tasks: Task[];
  studyLogs: StudyLog[];
  placements: PlacementApp[];
}

const Analytics: React.FC<AnalyticsProps> = ({ tasks, studyLogs, placements }) => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const gridColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
  const textColor = isDark ? '#9ca3af' : '#64748b';

  // Last 7 days study hours
  const last7 = useMemo(() => {
    const days: { label: string; hours: number; dsa: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      const log = studyLogs.find((l) => l.date === key);
      days.push({
        label: d.toLocaleDateString('en-IN', { weekday: 'short' }),
        hours: log?.hours ?? 0,
        dsa: log?.dsaQuestions ?? 0,
      });
    }
    return days;
  }, [studyLogs]);

  const studyBarData = {
    labels: last7.map((d) => d.label),
    datasets: [
      {
        label: 'Study Hours',
        data: last7.map((d) => d.hours),
        backgroundColor: 'rgba(106,167,171,0.7)',
        borderColor: '#6aa7ab',
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const dsaLineData = {
    labels: last7.map((d) => d.label),
    datasets: [
      {
        label: 'DSA Questions',
        data: last7.map((d) => d.dsa),
        borderColor: '#86b7bb',
        backgroundColor: 'rgba(106,167,171,0.1)',
        borderWidth: 2.5,
        pointBackgroundColor: '#6aa7ab',
        pointRadius: 5,
        pointHoverRadius: 7,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Task priority breakdown
  const taskDoughnutData = {
    labels: ['Low', 'Medium', 'High'],
    datasets: [
      {
        data: [
          tasks.filter((t) => t.priority === 'low').length,
          tasks.filter((t) => t.priority === 'medium').length,
          tasks.filter((t) => t.priority === 'high').length,
        ],
        backgroundColor: ['rgba(34,197,94,0.8)', 'rgba(234,179,8,0.8)', 'rgba(239,68,68,0.8)'],
        borderColor: ['#22c55e', '#eab308', '#ef4444'],
        borderWidth: 2,
      },
    ],
  };

  // Placement status breakdown
  const placementDoughnutData = {
    labels: ['Applied', 'Interview', 'Selected', 'Rejected'],
    datasets: [
      {
        data: [
          placements.filter((p) => p.status === 'applied').length,
          placements.filter((p) => p.status === 'interview').length,
          placements.filter((p) => p.status === 'selected').length,
          placements.filter((p) => p.status === 'rejected').length,
        ],
        backgroundColor: [
          'rgba(59,130,246,0.8)',
          'rgba(234,179,8,0.8)',
          'rgba(34,197,94,0.8)',
          'rgba(239,68,68,0.8)',
        ],
        borderColor: ['#3b82f6', '#eab308', '#22c55e', '#ef4444'],
        borderWidth: 2,
      },
    ],
  };

  const baseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: textColor, font: { family: 'Inter', size: 12 }, padding: 16 },
      },
      tooltip: {
        backgroundColor: isDark ? '#1f2937' : '#ffffff',
        titleColor: isDark ? '#e5e7eb' : '#1e293b',
        bodyColor: textColor,
        borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        ticks: { color: textColor, font: { family: 'Inter', size: 11 } },
        grid: { color: gridColor },
        border: { display: false },
      },
      y: {
        ticks: { color: textColor, font: { family: 'Inter', size: 11 } },
        grid: { color: gridColor },
        border: { display: false },
        beginAtZero: true,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: { color: textColor, font: { family: 'Inter', size: 12 }, padding: 16 },
      },
      tooltip: {
        backgroundColor: isDark ? '#1f2937' : '#ffffff',
        titleColor: isDark ? '#e5e7eb' : '#1e293b',
        bodyColor: textColor,
        borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
      },
    },
    cutout: '65%',
  };

  // Summary stats
  const totalStudyHours = studyLogs.reduce((s, l) => s + l.hours, 0);
  const totalDSA = studyLogs.reduce((s, l) => s + l.dsaQuestions, 0);
  const completionRate =
    tasks.length > 0
      ? Math.round((tasks.filter((t) => t.completed).length / tasks.length) * 100)
      : 0;
  const successRate =
    placements.length > 0
      ? Math.round(
          (placements.filter((p) => p.status === 'selected').length / placements.length) * 100
        )
      : 0;

  return (
    <div className="page-enter">
      {/* Summary Row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        {[
          { label: 'Total Study Hours', value: `${totalStudyHours}h`, color: '#6aa7ab' },
          { label: 'DSA Problems Solved', value: totalDSA, color: '#86b7bb' },
          { label: 'Task Completion', value: `${completionRate}%`, color: '#22c55e' },
          { label: 'Placement Success', value: `${successRate}%`, color: '#3b82f6' },
        ].map((s) => (
          <div key={s.label} className="card" style={{ padding: '1.25rem', textAlign: 'center' }}>
            <div
              style={{
                fontFamily: 'var(--font-head)',
                fontSize: '1.6rem',
                color: s.color,
                marginBottom: '0.25rem',
              }}
            >
              {s.value}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div className="charts-grid">
        {/* Weekly Study Hours */}
        <div className="chart-card">
          <div className="chart-title">📊 Weekly Study Hours</div>
          {studyLogs.length === 0 ? (
            <EmptyState icon="📊" title="No data" description="Log study sessions to see your chart." />
          ) : (
            <div style={{ height: '220px' }}>
              <Bar data={studyBarData} options={baseOptions} />
            </div>
          )}
        </div>

        {/* DSA Progress */}
        <div className="chart-card">
          <div className="chart-title">📈 DSA Questions (Last 7 Days)</div>
          {studyLogs.length === 0 ? (
            <EmptyState icon="📈" title="No data" description="Log study sessions to see your chart." />
          ) : (
            <div style={{ height: '220px' }}>
              <Line data={dsaLineData} options={baseOptions} />
            </div>
          )}
        </div>

        {/* Task Priority Breakdown */}
        <div className="chart-card">
          <div className="chart-title">🎯 Task Priority Breakdown</div>
          {tasks.length === 0 ? (
            <EmptyState icon="🎯" title="No tasks" description="Add tasks to see priority breakdown." />
          ) : (
            <div style={{ height: '220px' }}>
              <Doughnut data={taskDoughnutData} options={doughnutOptions} />
            </div>
          )}
        </div>

        {/* Placement Status */}
        <div className="chart-card">
          <div className="chart-title">💼 Placement Status Overview</div>
          {placements.length === 0 ? (
            <EmptyState icon="💼" title="No applications" description="Add placement applications to see breakdown." />
          ) : (
            <div style={{ height: '220px' }}>
              <Doughnut data={placementDoughnutData} options={doughnutOptions} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
