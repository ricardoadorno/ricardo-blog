"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pre } from "./Pre";
import { cn } from "@/lib/utils";

interface CodeSnippet {
  label: string;
  language?: string;
  code: string;
  filename?: string;
}

interface CodeGroupProps {
  snippets: CodeSnippet[];
  className?: string;
}

export function CodeGroup({ snippets, className }: CodeGroupProps) {
  if (!snippets || snippets.length === 0) {
    return null;
  }

  // Single snippet - render as regular Pre
  if (snippets.length === 1) {
    return (
      <Pre
        raw={snippets[0].code}
        language={snippets[0].language}
        filename={snippets[0].filename}
      >
        <code>{snippets[0].code}</code>
      </Pre>
    );
  }

  return (
    <Tabs
      defaultValue={snippets[0].label}
      className={cn("my-6 overflow-hidden rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm", className)}
    >
      {/* Tab triggers */}
      <TabsList className="w-full justify-start rounded-none border-b border-border/50 bg-muted/30 p-0 h-auto">
        {snippets.map((snippet) => (
          <TabsTrigger
            key={snippet.label}
            value={snippet.label}
            className={cn(
              "relative rounded-none border-b-2 border-transparent px-4 py-3",
              "data-[state=active]:border-primary data-[state=active]:bg-background/50",
              "data-[state=active]:text-foreground",
              "transition-all duration-200"
            )}
          >
            <span className="flex items-center gap-2">
              {snippet.label}
              {snippet.language && (
                <span className="text-xs font-mono uppercase text-muted-foreground">
                  {snippet.language}
                </span>
              )}
            </span>
          </TabsTrigger>
        ))}
      </TabsList>

      {/* Tab content */}
      {snippets.map((snippet) => (
        <TabsContent
          key={snippet.label}
          value={snippet.label}
          className="mt-0 border-0 p-0"
        >
          <Pre
            raw={snippet.code}
            language={snippet.language}
            filename={snippet.filename}
          >
            <code>{snippet.code}</code>
          </Pre>
        </TabsContent>
      ))}
    </Tabs>
  );
}
