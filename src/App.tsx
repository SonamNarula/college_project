import React, { useState, useEffect, useCallback } from 'react';
import './styles/global.css';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ToastContainer from './components/Toast';

import Dashboard from './pages/Dashboard';
import TaskManager from './pages/TaskManager';
import StudyTracker from './pages/StudyTracker';
import PlacementTracker from './pages/PlacementTracker';
import Analytics from './pages/Analytics';

import { useLocalStorage } from './hooks/useLocalStorage';
import { Task, StudyLog, PlacementApp, PlacementStatus, Priority, Page, Toast } from './types';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

const genId = () => Math.random().toString(36).slice(2, 10);

function App() {
  // ─── Theme ───
  const [isDark, setIsDark] = useLocalStorage<boolean>('trackify-dark', false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => setIsDark((d) => !d);

  // ─── Navigation ───
  const [page, setPage] = useState<Page>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ─── Data ───
  const [tasks, setTasks] = useLocalStorage<Task[]>('trackify-tasks', []);
  const [studyLogs, setStudyLogs] = useLocalStorage<StudyLog[]>('trackify-study', []);
  const [placements, setPlacements] = useLocalStorage<PlacementApp[]>('trackify-placements', []);
  const [streak, setStreak] = useLocalStorage<number>('trackify-streak', 0);
  const [lastStudyDate, setLastStudyDate] = useLocalStorage<string>('trackify-last-study', '');

  // ─── Toasts ───
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: Toast['type'] = 'success') => {
    const id = genId();
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // ─── Task Handlers ───
  const handleAddTask = (title: string, priority: Priority) => {
    const task: Task = {
      id: genId(),
      title,
      priority,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [...prev, task]);
    addToast(`Task added: "${title}"`, 'success');
  };

  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleDeleteTask = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
    addToast(`Task deleted${task ? `: "${task.title}"` : ''}`, 'info');
  };

  // ─── Study Handlers ───
  const handleAddStudyLog = (date: string, hours: number, dsaQuestions: number) => {
    const existingIndex = studyLogs.findIndex((l) => l.date === date);
    if (existingIndex >= 0) {
      setStudyLogs((prev) =>
        prev.map((l, i) =>
          i === existingIndex
            ? { ...l, hours: l.hours + hours, dsaQuestions: l.dsaQuestions + dsaQuestions }
            : l
        )
      );
      addToast(`Session updated for ${date}`, 'info');
    } else {
      setStudyLogs((prev) => [...prev, { date, hours, dsaQuestions }]);
      addToast(`Study session logged: ${hours}h`, 'success');
    }

    // Update streak
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    if (date === today) {
      if (lastStudyDate === today) {
        // already logged today, streak unchanged
      } else if (lastStudyDate === yesterday) {
        setStreak((s) => s + 1);
        setLastStudyDate(today);
      } else {
        setStreak(1);
        setLastStudyDate(today);
      }
    }
  };

  const handleDeleteStudyLog = (date: string) => {
    setStudyLogs((prev) => prev.filter((l) => l.date !== date));
    addToast('Study log removed', 'info');
  };

  // ─── Placement Handlers ───
  const handleAddPlacement = (
    company: string,
    role: string,
    status: PlacementStatus,
    notes: string
  ) => {
    const app: PlacementApp = {
      id: genId(),
      company,
      role,
      status,
      appliedDate: new Date().toISOString(),
      notes,
    };
    setPlacements((prev) => [...prev, app]);
    addToast(`Application added: ${company}`, 'success');
  };

  const handleDeletePlacement = (id: string) => {
    const app = placements.find((p) => p.id === id);
    setPlacements((prev) => prev.filter((p) => p.id !== id));
    addToast(`Removed: ${app?.company ?? 'application'}`, 'info');
  };

  const handleUpdatePlacementStatus = (id: string, status: PlacementStatus) => {
    setPlacements((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
    const app = placements.find((p) => p.id === id);
    if (status === 'selected') addToast(`🎉 Congrats! ${app?.company} selected you!`, 'success');
    else addToast(`Status updated`, 'info');
  };

  const renderPage = () => {
    switch (page) {
      case 'dashboard':
        return (
          <Dashboard
            tasks={tasks}
            studyLogs={studyLogs}
            placements={placements}
            streak={streak}
          />
        );
      case 'tasks':
        return (
          <TaskManager
            tasks={tasks}
            onAdd={handleAddTask}
            onToggle={handleToggleTask}
            onDelete={handleDeleteTask}
          />
        );
      case 'study':
        return (
          <StudyTracker
            studyLogs={studyLogs}
            streak={streak}
            onAddLog={handleAddStudyLog}
            onDeleteLog={handleDeleteStudyLog}
          />
        );
      case 'placement':
        return (
          <PlacementTracker
            placements={placements}
            onAdd={handleAddPlacement}
            onDelete={handleDeletePlacement}
            onUpdateStatus={handleUpdatePlacementStatus}
          />
        );
      case 'analytics':
        return (
          <Analytics tasks={tasks} studyLogs={studyLogs} placements={placements} />
        );
    }
  };

  return (
    <AuthProvider>
      <ProtectedRoute>
        <div className="app-shell">
          <Sidebar
            currentPage={page}
            onNavigate={setPage}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
          <div className="main-content">
            <Header
              currentPage={page}
              isDark={isDark}
              onThemeToggle={toggleTheme}
              onMenuToggle={() => setSidebarOpen((o) => !o)}
            />
            <div className="page-container">{renderPage()}</div>
          </div>
          <ToastContainer toasts={toasts} onRemove={removeToast} />
        </div>
      </ProtectedRoute>
    </AuthProvider>
  );
}

export default App;