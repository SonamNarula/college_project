import React from 'react';
import { Page } from '../types';

interface NavItem {
  id: Page;
  label: string;
  icon: React.ReactNode;
}

const LayoutDashboard = () => (
  <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="3" y="3" width="7" height="7" rx="1" strokeWidth="2"/>
    <rect x="14" y="3" width="7" height="7" rx="1" strokeWidth="2"/>
    <rect x="14" y="14" width="7" height="7" rx="1" strokeWidth="2"/>
    <rect x="3" y="14" width="7" height="7" rx="1" strokeWidth="2"/>
  </svg>
);

const CheckSquare = () => (
  <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polyline points="9 11 12 14 22 4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BookOpen = () => (
  <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Briefcase = () => (
  <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="2" y="7" width="20" height="14" rx="2" strokeWidth="2"/>
    <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BarChart2 = () => (
  <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <line x1="18" y1="20" x2="18" y2="10" strokeWidth="2" strokeLinecap="round"/>
    <line x1="12" y1="20" x2="12" y2="4" strokeWidth="2" strokeLinecap="round"/>
    <line x1="6" y1="20" x2="6" y2="14" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard /> },
  { id: 'tasks', label: 'Task Manager', icon: <CheckSquare /> },
  { id: 'study', label: 'Study Tracker', icon: <BookOpen /> },
  { id: 'placement', label: 'Placements', icon: <Briefcase /> },
  { id: 'analytics', label: 'Analytics', icon: <BarChart2 /> },
];

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate, isOpen, onClose }) => {
  const handleNav = (page: Page) => {
    onNavigate(page);
    onClose();
  };

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <div className="logo-text">Trackify</div>
          <div className="logo-sub">Productivity & Placement</div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-label">Main</div>
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => handleNav(item.id)}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="version-badge">Trackify v1.0 · Built for students</div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
