"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function InformationAccordion({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const openFromHash = () => {
      const target = window.location.hash ? container.querySelector<HTMLDetailsElement>(window.location.hash) : null;
      if (!target) return;
      container.querySelectorAll<HTMLDetailsElement>("details").forEach((item) => { item.open = item === target; });
      window.requestAnimationFrame(() => target.scrollIntoView({ behavior: "smooth", block: "start" }));
    };
    const handleToggle = (event: Event) => {
      const selected = event.target as HTMLDetailsElement;
      if (!selected.open) return;
      container.querySelectorAll<HTMLDetailsElement>("details").forEach((item) => { if (item !== selected) item.open = false; });
    };

    container.addEventListener("toggle", handleToggle, true);
    window.addEventListener("hashchange", openFromHash);
    openFromHash();
    return () => {
      container.removeEventListener("toggle", handleToggle, true);
      window.removeEventListener("hashchange", openFromHash);
    };
  }, []);

  return <div ref={containerRef} className="information-accordion">{children}</div>;
}
