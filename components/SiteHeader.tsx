"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconBook2, IconBuildingCommunity, IconHome } from "@tabler/icons-react";
import { usePathname } from "next/navigation";

const navigation = [
  { href: "/", label: "Home", icon: IconHome },
  { href: "/universities", label: "Universities", icon: IconBuildingCommunity },
  { href: "/information", label: "Information", icon: IconBook2 },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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
        {navigation.map(({ href, label, icon: Icon }) => {
          const isUniversityCalculator = !["/", "/information", "/universities"].includes(pathname);
          const active = href === "/"
            ? pathname === href
            : href === "/universities"
              ? pathname === href || isUniversityCalculator
              : pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link href={href} key={href} className={active ? "active" : undefined} aria-current={active ? "page" : undefined} onClick={() => setOpen(false)}>
              <Icon size={21} stroke={1.8} aria-hidden="true" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
