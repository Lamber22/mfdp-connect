import { Search, Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import logo from "@/assets/mfdp-logo.png";

interface DashboardHeaderProps {
  query: string;
  onQueryChange: (q: string) => void;
}

export function DashboardHeader({ query, onQueryChange }: DashboardHeaderProps) {
  const { theme, toggle } = useTheme();

  return (
    <header
      className="sticky top-0 z-50 w-full backdrop-blur-md supports-[backdrop-filter]:bg-background/80 overflow-x-hidden"
      style={{ 
        background: "var(--gradient-subtle)",
        position: "sticky",
        top: 0,
        willChange: "transform"
      }}
    >
      <div className="mx-auto max-w-7xl px-3 py-3 sm:px-6 sm:py-4">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <img
              src={logo}
              alt="MFDP Republic of Liberia seal"
              className="h-12 w-12 sm:h-14 sm:w-14 shrink-0 rounded-full object-contain bg-card ring-1 ring-border/50 shadow-sm"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Republic of Liberia
              </p>
              <h1 className="truncate text-sm sm:text-base font-bold text-foreground">
                MFDP Digital Services
              </h1>
            </div>
          </div>

          <button
            type="button"
            onClick={toggle}
            aria-label="Toggle theme"
            className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg border border-border/50 bg-card text-foreground transition-colors hover:bg-accent shrink-0"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
        </div>

        <div className="relative mt-3 sm:mt-4">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            type="search"
            inputMode="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search services..."
            aria-label="Search services"
            className="h-10 sm:h-11 w-full rounded-lg border border-border/50 bg-card pl-10 pr-4 text-base sm:text-sm text-foreground placeholder:text-muted-foreground shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary/50"
          />
        </div>
      </div>
    </header>
  );
}
