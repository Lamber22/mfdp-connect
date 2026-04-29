import { ExternalLink } from "lucide-react";
import type { Service } from "@/data/services";

interface ServiceCardProps {
  service: Service;
  onOpen: (service: Service) => void;
}

export function ServiceCard({ service, onOpen }: ServiceCardProps) {
  const Icon = service.icon;
  return (
    <a
      href={service.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => onOpen(service)}
      className="service-card group flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 text-left shadow-[var(--shadow-card)] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label={`Open ${service.name} in a new tab`}
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-primary-foreground"
          style={{ background: "var(--gradient-hero)" }}
        >
          <Icon className="h-6 w-6" aria-hidden="true" />
        </div>
        <span className="rounded-full bg-secondary px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-secondary-foreground">
          {service.category}
        </span>
      </div>

      <div className="flex-1">
        <h3 className="text-base font-semibold leading-tight text-card-foreground">
          {service.name}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          {service.description}
        </p>
      </div>

      <div className="flex items-center justify-between border-t border-border pt-3">
        <span className="text-sm font-medium text-primary">Open Service</span>
        <ExternalLink
          className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
          aria-hidden="true"
        />
      </div>
    </a>
  );
}
