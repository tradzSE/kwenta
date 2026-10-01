"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Kwenta — home" onClick={() => setOpen(false)}>
        <Image className="brand-logo" src="/web-logo.png" alt="Kwenta" width={140} height={51} priority />
      </Link>
      <button
        type="button"
        className="nav-toggle"
        aria-expanded={open}
        aria-controls="main-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((current) => !current)}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>
      <nav id="main-nav" aria-label="Main navigation" className={open ? "is-open" : undefined}>
        <Link href="/universities" onClick={() => setOpen(false)}>Universities</Link>
        <Link href="/methodology" onClick={() => setOpen(false)}>How it works</Link>
        <Link href="/about" onClick={() => setOpen(false)}>About</Link>
      </nav>
    </header>
  );
}
