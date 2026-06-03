import { useState } from 'react';
import { X, HelpCircle } from 'lucide-react';
import './OnboardingHelper.css';

export default function OnboardingHelper() {
  const [isOpen, setIsOpen] = useState(() => {
    return localStorage.getItem('wfo-helper-minimized') !== 'true';
  });

  const toggleOpen = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    localStorage.setItem('wfo-helper-minimized', (!nextState).toString());
  };

  if (!isOpen) {
    return (
      <button 
        className="onboarding-helper-minimized"
        onClick={toggleOpen}
        title="How to use"
      >
        <HelpCircle size={24} />
      </button>
    );
  }

  return (
    <div className="onboarding-helper-expanded">
      <div className="onboarding-header">
        <h3 className="onboarding-title">How to use</h3>
        <button onClick={toggleOpen} className="onboarding-close" aria-label="Minimize helper">
          <X size={16} />
        </button>
      </div>
      <ol className="onboarding-list">
        <li>Pick your grade</li>
        <li>Mark leave or holidays if needed</li>
        <li>Click dates to plan WFO</li>
        <li>Check your quota progress</li>
      </ol>
    </div>
  );
}
