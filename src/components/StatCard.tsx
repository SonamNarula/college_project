import React from 'react';

interface StatCardProps {
  value: string | number;
  label: string;
  trend?: string;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ value, label, trend, icon }) => (
  <div className="stat-card">
    <div className="stat-icon">{icon}</div>
    <div className="stat-value">{value}</div>
    <div className="stat-label">{label}</div>
    {trend && <div className="stat-trend">{trend}</div>}
  </div>
);

export default StatCard;
