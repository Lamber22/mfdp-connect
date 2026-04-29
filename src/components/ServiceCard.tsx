import { ExternalLink, ArrowRight } from "lucide-react";
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
      className="service-card group relative flex flex-col rounded-lg border border-border/50 bg-card overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      aria-label={`Open ${service.name}`}
    >
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="relative p-3 sm:p-5 flex flex-col h-full">
        <div className="flex items-start justify-between gap-2 mb-2 sm:mb-3">
          <div
            className="flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-lg text-primary-foreground shrink-0 group-hover:scale-110 transition-transform duration-200"
            style={{ background: "var(--gradient-hero)" }}
          >
            <Icon className="h-4 w-4 sm:h-6 sm:w-6" aria-hidden="true" />
          </div>
          <span className="rounded-md bg-secondary/60 px-1.5 sm:px-2 py-0.5 sm:py-1 text-[8px] sm:text-[10px] font-semibold uppercase tracking-wide text-secondary-foreground shrink-0">
            {service.category}
          </span>
        </div>

        <h3 className="text-xs sm:text-base font-bold leading-tight text-card-foreground group-hover:text-primary transition-colors mb-1.5 sm:mb-2 flex-1">
          {service.name}
        </h3>
        
        <p className="text-[11px] sm:text-sm text-muted-foreground leading-snug mb-2 sm:mb-3 flex-1">
          {service.description}
        </p>

        {/* Link action - most prominent */}
        <div className="flex items-center gap-1.5 text-[10px] sm:text-sm font-semibold text-primary group-hover:text-primary/80 transition-colors pt-2 border-t border-border/30">
          <span className="uppercase tracking-wide">Access</span>
          <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </div>
      </div>
    </a>
  );
}
