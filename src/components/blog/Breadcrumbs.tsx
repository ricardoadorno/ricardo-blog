"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const pathname = usePathname();

  // Auto-generate breadcrumbs from pathname if items not provided
  const breadcrumbs = items || generateBreadcrumbs(pathname);

  // Always include Home as first item
  const allBreadcrumbs = [
    { label: "Home", href: "/" },
    ...breadcrumbs.filter((item) => item.href !== "/"),
  ];

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "flex items-center gap-1 text-sm text-muted-foreground mb-6",
        className
      )}
    >
      <ol className="flex items-center gap-1 flex-wrap">
        {allBreadcrumbs.map((item, index) => {
          const isLast = index === allBreadcrumbs.length - 1;
          const isFirst = index === 0;

          return (
            <li
              key={item.href}
              className="flex items-center gap-1 group animate-in fade-in slide-in-from-left-2 duration-300"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Home icon for first item */}
              {isFirst ? (
                <Link
                  href={item.href}
                  className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-accent/50 hover:text-foreground transition-all duration-200"
                  aria-label={item.label}
                >
                  <Home className="w-4 h-4" />
                </Link>
              ) : isLast ? (
                // Current page (not a link)
                <span
                  className="px-2 py-1 rounded-md bg-primary/10 text-primary font-medium"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                // Intermediate links
                <Link
                  href={item.href}
                  className="px-2 py-1 rounded-md hover:bg-accent/50 hover:text-foreground transition-all duration-200 hover:underline underline-offset-4"
                >
                  {item.label}
                </Link>
              )}

              {/* Separator */}
              {!isLast && (
                <ChevronRight
                  className="w-4 h-4 text-muted-foreground/50"
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/**
 * Generate breadcrumbs from pathname
 * Example: /blog/my-post -> [{ label: "Blog", href: "/blog" }, { label: "My Post", href: "/blog/my-post" }]
 */
function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const paths = pathname.split("/").filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [];

  let currentPath = "";
  paths.forEach((segment) => {
    currentPath += `/${segment}`;

    // Format label: capitalize and replace hyphens with spaces
    let label = segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    // Special case for common segments
    if (segment === "blog") {
      label = "Blog";
    } else if (segment === "tag") {
      label = "Tag";
    } else if (segment === "about") {
      label = "About";
    }

    breadcrumbs.push({
      label,
      href: currentPath,
    });
  });

  return breadcrumbs;
}
