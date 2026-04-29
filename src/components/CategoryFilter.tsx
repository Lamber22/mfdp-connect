import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown, SlidersHorizontal } from "lucide-react";
import { categories, type ServiceCategory } from "@/data/services";

interface CategoryFilterProps {
  active: "All" | ServiceCategory;
  onChange: (c: "All" | ServiceCategory) => void;
}

export function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  const [open, setOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const dropdown = open ? createPortal(
    <ul
      role="listbox"
      aria-label="Filter by category"
      className="fixed z-[2147483647] overflow-hidden rounded-lg bg-popover p-2 shadow-lg animate-[fade-in_0.15s_ease-out] border border-border"
      style={{ 
        top: dropdownPosition.top,
        left: dropdownPosition.left,
        right: window.innerWidth - dropdownPosition.left - dropdownPosition.width,
        transform: 'translateZ(0)' // Force hardware acceleration
      }}
    >
      {categories.map((c) => {
        const isActive = c === active;
        return (
          <li key={c}>
            <button
              type="button"
              role="option"
              aria-selected={isActive}
              onClick={() => {
                onChange(c);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-foreground hover:bg-accent/50"
              }`}
            >
              <span>{c}</span>
              {isActive && <Check className="h-4 w-4" aria-hidden="true" />}
            </button>
          </li>
        );
      })}
    </ul>,
    document.body
  ) : null;

  return (
    <>
      {/* Mobile: dropdown toggle */}
      <div ref={wrapRef}>
        <button
          ref={buttonRef}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full lg:hidden items-center justify-between gap-2 rounded-lg bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent/50"
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-primary" aria-hidden="true" />
            <span className="text-muted-foreground">Filter:</span>
            <span className="font-semibold">{active}</span>
          </span>
          <ChevronDown
            className={`h-4 w-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </button>
      </div>

      {dropdown}

      {/* Desktop: vertical list */}
      <div
        className="hidden flex-col gap-1 lg:flex"
        role="tablist"
        aria-label="Filter by category"
      >
        {categories.map((c) => {
          const isActive = c === active;
          return (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(c)}
              className={`px-3 py-2.5 text-sm font-medium rounded-lg text-left transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>
    </>
  );
}
