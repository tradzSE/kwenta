"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { IconCalculator, IconChevronLeft, IconChevronRight, IconSearch } from "@tabler/icons-react";
import UniversityMark from "@/components/UniversityMark";

type DirectoryUniversity = {
  slug: string;
  name: string;
  shortName: string;
  logoSrc?: string;
};

export default function UniversityDirectory({ universities }: { universities: DirectoryUniversity[] }) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const pageSize = 12;
  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase();
    if (!normalized) return universities;
    return universities.filter((university) => `${university.name} ${university.shortName}`.toLocaleLowerCase().includes(normalized));
  }, [query, universities]);
  const pageCount = Math.ceil(filtered.length / pageSize);
  const visibleUniversities = filtered.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <>
      <label className="directory-search">
        <IconSearch size={20} stroke={1.7} aria-hidden="true" />
        <span className="sr-only">Search universities</span>
        <input type="search" value={query} onChange={(event) => { setQuery(event.target.value); setPage(0); }} placeholder="Search universities" autoComplete="off" />
        <small>{filtered.length} result{filtered.length === 1 ? "" : "s"}</small>
      </label>

      {filtered.length > 0 ? (
        <ul className="university-picker-grid">
          {visibleUniversities.map((university) => (
            <li key={university.slug}>
              <Link href={`/${university.slug}`} title={university.name}>
                <span className="university-picker-mark">
                  {university.slug === "custom" ? <IconCalculator size={52} stroke={1.35} aria-hidden="true" /> : <UniversityMark logoSrc={university.logoSrc} shortName={university.shortName} size={64} />}
                </span>
                <strong>{university.shortName}</strong>
                <small>{university.name}</small>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="directory-empty"><strong>No matching university</strong><p>Try the school&apos;s full name or abbreviation.</p><Link href="/custom">Use the custom calculator</Link></div>
      )}
      {pageCount > 1 && (
        <nav className="directory-pagination" aria-label="University directory pages">
          <button type="button" onClick={() => setPage((current) => Math.max(0, current - 1))} disabled={page === 0} aria-label="Previous page"><IconChevronLeft size={22} stroke={1.8} aria-hidden="true" /></button>
          <div>{Array.from({ length: pageCount }, (_, index) => <button type="button" key={index} className={page === index ? "active" : undefined} aria-current={page === index ? "page" : undefined} aria-label={`Page ${index + 1}`} onClick={() => setPage(index)} />)}</div>
          <button type="button" onClick={() => setPage((current) => Math.min(pageCount - 1, current + 1))} disabled={page === pageCount - 1} aria-label="Next page"><IconChevronRight size={22} stroke={1.8} aria-hidden="true" /></button>
        </nav>
      )}
    </>
  );
}
