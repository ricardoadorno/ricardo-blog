import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReadingTimeProps {
  minutes: number;
  className?: string;
  variant?: "default" | "minimal" | "badge";
}

export function ReadingTime({
  minutes,
  className,
  variant = "default"
}: ReadingTimeProps) {
  const readingText = `${minutes} min read`;

  if (variant === "minimal") {
    return (
      <span
        className={cn("text-sm text-muted-foreground", className)}
        aria-label={`Estimated reading time: ${minutes} minutes`}
      >
        {readingText}
      </span>
    );
  }

  if (variant === "badge") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
          "bg-primary/10 text-primary border border-primary/20",
          className
        )}
        aria-label={`Estimated reading time: ${minutes} minutes`}
      >
        <Clock className="w-3 h-3" />
        {readingText}
      </span>
    );
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 text-sm text-muted-foreground",
        className
      )}
      aria-label={`Estimated reading time: ${minutes} minutes`}
    >
      <Clock className="w-4 h-4" />
      <span>{readingText}</span>
    </div>
  );
}
