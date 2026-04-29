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
      className="sticky top-0 z-40 border-b border-border backdrop-blur supports-[backdrop-filter]:bg-background/80"
      style={{ background: "var(--gradient-subtle)" }}
    >
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="MFDP Republic of Liberia seal"
              className="h-11 w-11 shrink-0 rounded-full object-contain bg-card ring-1 ring-border shadow-[var(--shadow-card)]"
            />
            <div className="min-w-0">
              <p className="truncate text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Republic of Liberia
              </p>
              <h1 className="truncate text-sm font-bold text-foreground sm:text-base">
                MFDP Digital Services
              </h1>
            </div>
          </div>

          <button
            type="button"
            onClick={toggle}
            aria-label="Toggle theme"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-foreground transition-colors hover:bg-accent"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
        </div>

        <div className="relative mt-4">
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
            className="h-12 w-full rounded-xl border border-border bg-card pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground shadow-[var(--shadow-card)] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      </div>
    </header>
  );
}
