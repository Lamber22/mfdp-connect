import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SearchX, Clock } from "lucide-react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { CategoryFilter } from "@/components/CategoryFilter";
import { ServiceCard } from "@/components/ServiceCard";
import { services, type ServiceCategory, type Service } from "@/data/services";
import { useRecentServices } from "@/hooks/use-recent-services";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MFDP Digital Services Dashboard — Republic of Liberia" },
      {
        name: "description",
        content:
          "Centralized access portal for the Ministry of Finance and Development Planning (MFDP) digital services in Liberia.",
      },
      { property: "og:title", content: "MFDP Digital Services Dashboard" },
      {
        property: "og:description",
        content:
          "Access all MFDP digital services in one place — financial systems, document management, planning tools, and more.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
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
    <div className="min-h-screen bg-background">
      <DashboardHeader query={query} onQueryChange={setQuery} />

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <section className="mb-6 animate-[fade-in_0.4s_ease-out]">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Welcome
          </h2>
          <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Your single access point for the Ministry of Finance and Development
            Planning's digital services.
          </p>
        </section>

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
              All Services
              <span className="ml-2 normal-case tracking-normal text-muted-foreground/70">
                ({filtered.length})
              </span>
            </h3>
          </div>

          <div className="mb-5">
            <CategoryFilter active={category} onChange={setCategory} />
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 px-6 py-16 text-center">
              <SearchX className="h-10 w-10 text-muted-foreground" aria-hidden="true" />
              <p className="mt-4 text-base font-medium text-foreground">
                No services found
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try a different search term or category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((s, i) => (
                <div
                  key={s.id}
                  className="animate-[slide-up_0.4s_ease-out_both]"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <ServiceCard service={s} onOpen={() => trackVisit(s.id)} />
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="mt-12 border-t border-border bg-card/50">
        <div className="mx-auto max-w-6xl px-4 py-6 text-center text-xs text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} Ministry of Finance and Development Planning,
          Republic of Liberia. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
