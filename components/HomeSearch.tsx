"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconSearch } from "@tabler/icons-react";
import UniversityMark from "@/components/UniversityMark";
import { universities } from "@/data/universities/registry";

export default function HomeSearch() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const sorted = useMemo(
    () =>
      [...universities].sort((a, b) => {
        if (a.slug === "custom") return 1;
        if (b.slug === "custom") return -1;
        return a.name.localeCompare(b.name);
      }),
    []
  );

  const q = query.trim().toLowerCase();
  const filtered = useMemo(() => {
    if (!q) return sorted;
    return sorted.filter((u) =>
      [u.name, u.shortName, u.slug].join(" ").toLowerCase().includes(q)
    );
  }, [q, sorted]);

  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const goTo = (slug: string) => {
    setOpen(false);
    router.push(`/${slug}`);
  };

  return (
    <div className="kwenta-search" ref={containerRef}>
      <div className="kwenta-search-box">
        <IconSearch size={20} stroke={2} aria-hidden="true" className="kwenta-search-icon" />
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls="kwenta-search-list"
          aria-autocomplete="list"
          autoComplete="off"
          placeholder="Search your university (e.g. CLSU, UP, DLSU...)"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setHighlight(0);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
              setHighlight((c) => Math.min(c + 1, Math.max(filtered.length - 1, 0)));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setHighlight((c) => Math.max(c - 1, 0));
            } else if (e.key === "Enter") {
              if (filtered[highlight]) {
                e.preventDefault();
                goTo(filtered[highlight].slug);
              }
            } else if (e.key === "Escape") {
              setOpen(false);
              inputRef.current?.blur();
            }
          }}
        />
        <span className="kwenta-kbd" aria-hidden="true">
          <kbd>Ctrl</kbd>
          <kbd>K</kbd>
        </span>
      </div>

      {open && (
        <div className="kwenta-dropdown">
          <p className="kwenta-dropdown-count" aria-live="polite">
            {filtered.length === 0
              ? "No matches"
              : `${filtered.length} of ${sorted.length} universities`}
          </p>
          {filtered.length > 0 ? (
            <ul id="kwenta-search-list" role="listbox" aria-label="Universities">
              {filtered.slice(0, 8).map((u, i) => (
                <li key={u.slug} role="option" aria-selected={i === highlight}>
                  <Link
                    href={`/${u.slug}`}
                    className={i === highlight ? "is-highlighted" : undefined}
                    onMouseEnter={() => setHighlight(i)}
                    onFocus={() => setHighlight(i)}
                    onClick={() => setOpen(false)}
                  >
                    <UniversityMark logoSrc={u.logoSrc} shortName={u.shortName} size={36} />
                    <span>
                      <strong>{u.shortName}</strong>
                      <small>{u.name}</small>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="kwenta-dropdown-empty">
              <p>No university matches “{query.trim()}”.</p>
              <Link href="/custom" onClick={() => setOpen(false)}>
                Use the custom calculator →
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
