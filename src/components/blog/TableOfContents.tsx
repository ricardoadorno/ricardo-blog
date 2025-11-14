"use client";

import { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { List, ChevronRight } from "lucide-react";
import type { TOCHeading } from "@/lib/toc";

interface TableOfContentsProps {
  headings: TOCHeading[];
  className?: string;
}

export function TableOfContents({ headings, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  // Scrollspy - detecta seção ativa
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -66%",
        threshold: 1.0,
      }
    );

    // Observa todos os headings
    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleClick = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100; // Offset para header fixo
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({
        top: y,
        behavior: "smooth"
      });

      // Fecha sheet em mobile após clicar
      setIsOpen(false);

      // Atualiza URL sem scroll
      history.pushState(null, "", `#${id}`);
    }
  }, []);

  // Componente de conteúdo do TOC (reutilizado em desktop e mobile)
  const TOCContent = () => (
    <nav className="space-y-1" aria-label="Table of contents">
      <h2 className="font-semibold mb-4 text-sm uppercase tracking-wide text-muted-foreground flex items-center gap-2">
        <List className="w-4 h-4" />
        On This Page
      </h2>

      <div className="space-y-1">
        {headings.map((heading) => (
          <button
            key={heading.id}
            onClick={() => handleClick(heading.id)}
            className={cn(
              "block w-full text-left text-sm py-2 px-3 rounded-md",
              "transition-all duration-200",
              "hover:bg-accent hover:text-accent-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              heading.level === 3 && "pl-6 text-xs",
              activeId === heading.id
                ? "bg-accent text-accent-foreground font-medium border-l-2 border-primary"
                : "text-muted-foreground"
            )}
            aria-current={activeId === heading.id ? "location" : undefined}
          >
            <span className="flex items-center gap-2">
              {activeId === heading.id && (
                <ChevronRight className="w-3 h-3 flex-shrink-0" />
              )}
              <span className="line-clamp-2">{heading.text}</span>
            </span>
          </button>
        ))}
      </div>
    </nav>
  );

  if (headings.length === 0) {
    return null;
  }

  return (
    <>
      {/* Desktop TOC - Sticky Sidebar */}
      <aside
        className={cn(
          "hidden xl:block sticky top-24 h-fit",
          "max-h-[calc(100vh-8rem)] overflow-auto",
          "scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent",
          className
        )}
      >
        <div className="w-64 pr-4">
          <TOCContent />
        </div>
      </aside>

      {/* Mobile TOC - Floating Action Button + Sheet */}
      <div className="xl:hidden fixed bottom-6 right-6 z-40">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="default"
              className={cn(
                "rounded-full shadow-lg h-14 w-14",
                "bg-gradient-to-br from-primary to-accent",
                "hover:scale-110 transition-transform",
                "ring-2 ring-background"
              )}
              aria-label="Open table of contents"
            >
              <List className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-80 sm:w-96 overflow-y-auto"
          >
            <div className="mt-8">
              <TOCContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
