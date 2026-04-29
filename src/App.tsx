import { useMemo, useState } from "react";
import { SearchX, Clock } from "lucide-react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { CategoryFilter } from "@/components/CategoryFilter";
import { ServiceCard } from "@/components/ServiceCard";
import { services, type ServiceCategory, type Service } from "@/data/services";
import { useRecentServices } from "@/hooks/use-recent-services";
import logoUrl from "@/assets/mfdp-logo.png";

function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"All" | ServiceCategory>("All");
  const { recent, trackVisit } = useRecentServices();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return services.filter((s) => {
      const inCat = category === "All" || s.category === category;
      const inQuery =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        (s.shortName?.toLowerCase().includes(q) ?? false);
      return inCat && inQuery;
    });
  }, [query, category]);

  const recentServices = useMemo(
    () =>
      recent
        .map((id) => services.find((s) => s.id === id))
        .filter((s): s is Service => Boolean(s)),
    [recent],
  );

  const showRecent = recentServices.length > 0 && !query && category === "All";

  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-background">
      <DashboardHeader query={query} onQueryChange={setQuery} />

      <main className="mx-auto max-w-7xl px-3 py-6 sm:px-6 sm:py-8 w-full">
        {!query && (
          <section className="mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-2">
              Welcome
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
              Your single access point for the Ministry of Finance and Development Planning's digital services.
            </p>
          </section>
        )}

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar - Filters */}
          {!query && (
            <aside className="w-full lg:w-64 shrink-0">
              <div className="sticky top-24 space-y-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground px-2">
                    Categories
                  </h3>
                  <CategoryFilter active={category} onChange={setCategory} />
                </div>
              </aside>
          )}

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Featured Recently Used */}
            {showRecent && (
              <section className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-4 w-4 text-primary" />
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">
                    Recently Accessed
                  </h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {recentServices.map((s) => (
                    <ServiceCard key={`recent-${s.id}`} service={s} onOpen={() => trackVisit(s.id)} />
                  ))}
                </div>
              </section>
            )}

            {/* All Services */}
            <section>
              <div className="mb-6 flex items-baseline gap-2">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">
                  {query ? "Search Results" : "All Services"}
                </h2>
                <span className="text-xs font-medium text-muted-foreground">
                  {filtered.length} service{filtered.length !== 1 ? "s" : ""}
                </span>
              </div>

              {filtered.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {filtered.map((s) => (
                    <ServiceCard key={s.id} service={s} onOpen={() => trackVisit(s.id)} />
                  ))}
                </div>
              ) : (
                <div className="flex min-h-80 flex-col items-center justify-center rounded-xl border border-border border-dashed bg-muted/30 px-4 py-12 text-center">
                  <SearchX className="mb-3 h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mb-1 text-lg font-semibold text-foreground">No services found</h3>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    {query 
                      ? "Try adjusting your search terms"
                      : "No services match the selected category"}
                  </p>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      <footer className="border-t border-border bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 mt-12">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 py-8 w-full">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src={logoUrl} alt="MFDP Logo" className="h-10 w-10" />
              <div className="text-xs text-muted-foreground">
                <p className="font-medium text-foreground">MFDP</p>
                <p>Ministry of Finance & Development Planning</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center sm:text-right">
              &copy; {new Date().getFullYear()} Republic of Liberia. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
