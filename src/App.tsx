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

      <main className="mx-auto max-w-6xl px-3 py-6 sm:px-6 sm:py-8 w-full">
        {!query && (
          <section className="mb-6 animate-[fade-in_0.4s_ease-out]">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Welcome
            </h2>
            <p className="mt-1.5 max-w-2xl text-xs sm:text-sm text-muted-foreground md:text-base">
              Your single access point for the Ministry of Finance and Development
              Planning's digital services.
            </p>
          </section>
        )}

        {showRecent && (
          <section className="mb-8 animate-[slide-up_0.4s_ease-out]">
            <div className="mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Recently Accessed
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {recentServices.map((s) => (
                <ServiceCard key={`recent-${s.id}`} service={s} onOpen={() => trackVisit(s.id)} />
              ))}
            </div>
          </section>
        )}

        <section>
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {query ? "Search Results" : "All Services"}
              <span className="ml-2 normal-case tracking-normal text-muted-foreground/70">
                ({filtered.length})
              </span>
            </h3>
          </div>

          {!query && (
            <div className="mb-5">
              <CategoryFilter active={category} onChange={setCategory} />
            </div>
          )}

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((s) => (
                <ServiceCard key={s.id} service={s} onOpen={() => trackVisit(s.id)} />
              ))}
            </div>
          ) : (
            <div className="flex min-h-96 flex-col items-center justify-center rounded-lg border border-border bg-muted/50 px-4 py-12 text-center">
              <SearchX className="mb-3 h-10 w-10 text-muted-foreground" />
              <h3 className="mb-1 text-lg font-semibold text-foreground">No services found</h3>
              <p className="text-sm text-muted-foreground">
                Try adjusting your filters or search query
              </p>
            </div>
          )}
        </section>
      </main>

      <footer className="border-t border-border bg-muted/30 py-8 text-center text-xs sm:text-sm text-muted-foreground w-full overflow-x-hidden">
        <div className="mx-auto max-w-6xl px-3 sm:px-6">
          <div className="mb-4 flex justify-center">
            <img src={logoUrl} alt="MFDP Logo" className="h-12 w-12" />
          </div>
          <p>
            &copy; {new Date().getFullYear()} Ministry of Finance and Development Planning,
            Republic of Liberia. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
