import React from 'react';
import { cn } from '@/lib/utils';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
  variant?: 'default' | 'pills' | 'underline';
}

export function Tabs({ tabs, defaultTab, className, variant = 'default' }: TabsProps) {
  const [activeTab, setActiveTab] = React.useState(defaultTab || tabs[0]?.id);

  const activeContent = tabs.find((tab) => tab.id === activeTab)?.content;

  const getTabClasses = (tabId: string) => {
    const isActive = activeTab === tabId;
    
    const baseClasses = 'px-4 py-2 font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary';
    
    if (variant === 'pills') {
      return cn(
        baseClasses,
        'rounded-full',
        isActive
          ? 'bg-primary text-white'
          : 'text-muted hover:bg-muted/10 hover:text-dark'
      );
    }
    
    if (variant === 'underline') {
      return cn(
        baseClasses,
        'border-b-2 -mb-px',
        isActive
          ? 'border-primary text-primary'
          : 'border-transparent text-muted hover:text-dark'
      );
    }
    
    return cn(
      baseClasses,
      'rounded-t-lg border-x border-t',
      isActive
        ? 'bg-white border-muted text-primary border-b-0'
        : 'bg-muted/5 border-transparent text-muted hover:bg-muted/10 hover:text-dark border-b'
    );
  };

  return (
    <div className={cn('w-full', className)}>
      <div
        className={cn(
          'flex gap-1',
          variant === 'underline' && 'border-b border-muted'
        )}
        role="tablist"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={getTabClasses(tab.id)}
          >
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`panel-${activeTab}`}
        aria-labelledby={activeTab}
        className={cn(
          'mt-4',
          variant === 'default' && 'border border-muted rounded-b-lg rounded-tr-lg p-6 bg-white'
        )}
      >
        {activeContent}
      </div>
    </div>
  );
}
