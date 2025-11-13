import { ReactNode } from 'react';
import { AlertCircle, Info, CheckCircle, AlertTriangle } from 'lucide-react';

type CalloutType = 'info' | 'warning' | 'error' | 'success';

interface CalloutProps {
  type?: CalloutType;
  children: ReactNode;
  title?: string;
}

const calloutStyles = {
  info: {
    container: 'glass border-l-4 border-l-blue-500 dark:border-l-blue-400',
    icon: 'text-blue-600 dark:text-blue-400',
    title: 'text-blue-900 dark:text-blue-300 font-semibold',
    Icon: Info,
  },
  warning: {
    container: 'glass border-l-4 border-l-yellow-500 dark:border-l-yellow-400',
    icon: 'text-yellow-600 dark:text-yellow-400',
    title: 'text-yellow-900 dark:text-yellow-300 font-semibold',
    Icon: AlertTriangle,
  },
  error: {
    container: 'glass border-l-4 border-l-red-500 dark:border-l-red-400',
    icon: 'text-red-600 dark:text-red-400',
    title: 'text-red-900 dark:text-red-300 font-semibold',
    Icon: AlertCircle,
  },
  success: {
    container: 'glass border-l-4 border-l-emerald-500 dark:border-l-emerald-400',
    icon: 'text-emerald-600 dark:text-emerald-400',
    title: 'text-emerald-900 dark:text-emerald-300 font-semibold',
    Icon: CheckCircle,
  },
};

export function Callout({ type = 'info', children, title }: CalloutProps) {
  const styles = calloutStyles[type];
  const Icon = styles.Icon;

  return (
    <div className={`my-6 rounded-xl p-5 backdrop-blur-xl ${styles.container}`}>
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <Icon className={`h-6 w-6 ${styles.icon}`} />
        </div>
        <div className="flex-1">
          {title && (
            <h5 className={`mb-2 ${styles.title}`}>{title}</h5>
          )}
          <div className="text-sm leading-relaxed [&>p]:m-0">{children}</div>
        </div>
      </div>
    </div>
  );
}
