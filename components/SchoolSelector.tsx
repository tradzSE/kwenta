"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import UniversityMark from "@/components/UniversityMark";
import { universities } from "@/data/universities/registry";

export default function SchoolSelector() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const sortedUniversities = useMemo(
    () =>
      [...universities].sort((first, second) => {
        if (first.slug === "custom") return 1;
        if (second.slug === "custom") return -1;
        return first.name.localeCompare(second.name);
      }),
    []
  );

  const normalizedQuery = query.trim().toLowerCase();
  const filtered = useMemo(() => {
    if (!normalizedQuery) return sortedUniversities;
    return sortedUniversities.filter((university) =>
      [university.name, university.shortName, university.slug]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery)
    );
  }, [normalizedQuery, sortedUniversities]);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  const goTo = (slug: string) => {
    setOpen(false);
    router.push(`/${slug}`);
  };

  return (
    <div className={`school-select${open ? " is-open" : ""}`}>
      <label htmlFor="school-search">University</label>
      <div className="school-search" ref={containerRef}>
        <div className="school-search-box">
          <input
            id="school-search"
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded={open}
            aria-controls="school-search-list"
            aria-autocomplete="list"
            autoComplete="off"
            placeholder="Search your university"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setHighlight(0);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                setOpen(true);
                setHighlight((current) => Math.min(current + 1, Math.max(filtered.length - 1, 0)));
              } else if (event.key === "ArrowUp") {
                event.preventDefault();
                setHighlight((current) => Math.max(current - 1, 0));
              } else if (event.key === "Enter") {
                if (filtered[highlight]) {
                  event.preventDefault();
                  goTo(filtered[highlight].slug);
                }
              } else if (event.key === "Escape") {
                setOpen(false);
                inputRef.current?.blur();
              }
            }}
          />
          {query ? (
            <button
              type="button"
              className="school-search-clear"
              aria-label="Clear search"
              onClick={() => {
                setQuery("");
                setHighlight(0);
                setOpen(true);
                inputRef.current?.focus();
              }}
            >
              ×
            </button>
          ) : (
            <span className="school-search-hint" aria-hidden="true">
              ⌕
            </span>
          )}
        </div>

        {open && (
          <div className="school-search-dropdown">
            <p className="school-search-count" aria-live="polite">
              {filtered.length === 0
                ? "No matches"
                : `${filtered.length} of ${sortedUniversities.length} universities`}
            </p>
            {filtered.length > 0 ? (
              <ul id="school-search-list" role="listbox" aria-label="Universities">
                {filtered.map((university, index) => (
                  <li key={university.slug} role="option" aria-selected={index === highlight}>
                    <Link
                      href={`/${university.slug}`}
                      className={index === highlight ? "is-highlighted" : undefined}
                      onMouseEnter={() => setHighlight(index)}
                      onFocus={() => setHighlight(index)}
                      onClick={() => setOpen(false)}
                    >
                      <UniversityMark
                        logoSrc={university.logoSrc}
                        shortName={university.shortName}
                        size={38}
                      />
                      <span>
                        <strong>{university.shortName}</strong>
                        <small>{university.name}</small>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="school-search-empty">
                <p>
                  No university matches “{query.trim()}”.
                </p>
                <Link href="/custom" onClick={() => setOpen(false)}>
                  Use the custom calculator →
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
