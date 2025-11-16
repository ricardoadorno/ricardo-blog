"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Button } from './button';
import { cn } from '@/lib/utils';

export function ThemeToggle() {
    const { setTheme, theme } = useTheme();
    const [isChanging, setIsChanging] = React.useState(false);

    const toggleTheme = () => {
        setIsChanging(true);
        setTheme(theme === "light" ? "dark" : "light");
        setTimeout(() => setIsChanging(false), 400);
    };

    return (
        <Button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            variant={'ghost'}
            className="relative overflow-hidden"
        >
            <div className={cn(
                "transition-transform duration-400 ease-in-out",
                isChanging && "rotate-360"
            )}>
                <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </div>
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}