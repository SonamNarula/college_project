import React, { useEffect, useState } from 'react';
import { Toast as ToastType } from '../types';

const CheckIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polyline points="20 6 9 17 4 12" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const XIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <line x1="18" y1="6" x2="6" y2="18" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

const InfoIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" strokeWidth="2"/>
    <line x1="12" y1="8" x2="12" y2="12" strokeWidth="2" strokeLinecap="round"/>
    <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

interface ToastItemProps {
  toast: ToastType;
  onRemove: (id: string) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onRemove }) => {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(() => onRemove(toast.id), 250);
    }, 3000);
    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  const iconMap = {
    success: <CheckIcon />,
    error: <XIcon />,
    info: <InfoIcon />,
  };

  const colorMap = {
    success: '#22c55e',
    error: '#ef4444',
    info: 'var(--accent-5)',
  };

  return (
    <div className={`toast toast-${toast.type} ${exiting ? 'toast-exit' : ''}`}>
      <span style={{ color: colorMap[toast.type], flexShrink: 0 }}>{iconMap[toast.type]}</span>
      <span>{toast.message}</span>
    </div>
  );
};

interface ToastContainerProps {
  toasts: ToastType[];
  onRemove: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => (
  <div className="toast-container">
    {toasts.map((t) => (
      <ToastItem key={t.id} toast={t} onRemove={onRemove} />
    ))}
  </div>
);

export default ToastContainer;
