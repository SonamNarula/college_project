import React from 'react';
import { Page } from '../types';

const pageTitles: Record<Page, { title: string; subtitle: string }> = {
  dashboard: { title: 'Dashboard', subtitle: 'Your productivity overview' },
  tasks: { title: 'Task Manager', subtitle: 'Manage your daily to-dos' },
  study: { title: 'Study Tracker', subtitle: 'Log hours & maintain streaks' },
  placement: { title: 'Placement Tracker', subtitle: 'Track job applications' },
  analytics: { title: 'Analytics', subtitle: 'Visualize your progress' },
};

const SunIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="5" strokeWidth="2"/>
    <line x1="12" y1="1" x2="12" y2="3" strokeWidth="2" strokeLinecap="round"/>
    <line x1="12" y1="21" x2="12" y2="23" strokeWidth="2" strokeLinecap="round"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" strokeWidth="2" strokeLinecap="round"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" strokeWidth="2" strokeLinecap="round"/>
    <line x1="1" y1="12" x2="3" y2="12" strokeWidth="2" strokeLinecap="round"/>
    <line x1="21" y1="12" x2="23" y2="12" strokeWidth="2" strokeLinecap="round"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" strokeWidth="2" strokeLinecap="round"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MenuIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <line x1="3" y1="6" x2="21" y2="6" strokeWidth="2" strokeLinecap="round"/>
    <line x1="3" y1="12" x2="21" y2="12" strokeWidth="2" strokeLinecap="round"/>
    <line x1="3" y1="18" x2="21" y2="18" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

interface HeaderProps {
  currentPage: Page;
  isDark: boolean;
  onThemeToggle: () => void;
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, isDark, onThemeToggle, onMenuToggle }) => {
  const { title, subtitle } = pageTitles[currentPage];

  return (
    <header className="header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button className="mobile-menu-btn" onClick={onMenuToggle} aria-label="Toggle menu">
          <MenuIcon />
        </button>
        <div className="header-left">
          <h1 className="header-title">{title}</h1>
          <p className="header-subtitle">{subtitle}</p>
        </div>
      </div>
      <div className="header-right">
        <button
          className="theme-toggle"
          onClick={onThemeToggle}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </header>
  );
};

export default Header;
