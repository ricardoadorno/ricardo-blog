import { ReactNode } from 'react';
import { AlertCircle, Info, CheckCircle, AlertTriangle, Lightbulb, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

type CalloutType = 'info' | 'warning' | 'error' | 'success' | 'tip' | 'danger';

interface CalloutProps {
  type?: CalloutType;
  children: ReactNode;
  title?: string;
  className?: string;
}

const calloutConfig = {
  info: {
    container: 'bg-blue-500/10 border-blue-500/30 dark:bg-blue-500/5',
    icon: 'text-blue-600 dark:text-blue-400',
    title: 'text-blue-900 dark:text-blue-300',
    Icon: Info,
  },
  warning: {
    container: 'bg-yellow-500/10 border-yellow-500/30 dark:bg-yellow-500/5',
    icon: 'text-yellow-600 dark:text-yellow-400',
    title: 'text-yellow-900 dark:text-yellow-300',
    Icon: AlertTriangle,
  },
  error: {
    container: 'bg-red-500/10 border-red-500/30 dark:bg-red-500/5',
    icon: 'text-red-600 dark:text-red-400',
    title: 'text-red-900 dark:text-red-300',
    Icon: AlertCircle,
  },
  success: {
    container: 'bg-emerald-500/10 border-emerald-500/30 dark:bg-emerald-500/5',
    icon: 'text-emerald-600 dark:text-emerald-400',
    title: 'text-emerald-900 dark:text-emerald-300',
    Icon: CheckCircle,
  },
  tip: {
    container: 'bg-purple-500/10 border-purple-500/30 dark:bg-purple-500/5',
    icon: 'text-purple-600 dark:text-purple-400',
    title: 'text-purple-900 dark:text-purple-300',
    Icon: Lightbulb,
  },
  danger: {
    container: 'bg-orange-500/10 border-orange-500/30 dark:bg-orange-500/5',
    icon: 'text-orange-600 dark:text-orange-400',
    title: 'text-orange-900 dark:text-orange-300',
    Icon: Zap,
  },
};

export function Callout({ type = 'info', children, title, className }: CalloutProps) {
  const config = calloutConfig[type];
  const Icon = config.Icon;

  return (
    <div
      className={cn(
        "my-6 rounded-xl border p-5 backdrop-blur-sm transition-all duration-200",
        "hover:shadow-lg hover:shadow-primary/5",
        config.container,
        className
      )}
    >
      <div className="flex gap-4">
        <div className="flex-shrink-0 mt-0.5">
          <Icon className={cn("h-5 w-5", config.icon)} />
        </div>
        <div className="flex-1 min-w-0">
          {title && (
            <h5 className={cn("mb-2 font-semibold text-base", config.title)}>
              {title}
            </h5>
          )}
          <div className="prose prose-sm dark:prose-invert max-w-none [&>p]:my-1 [&>p:first-child]:mt-0 [&>p:last-child]:mb-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
