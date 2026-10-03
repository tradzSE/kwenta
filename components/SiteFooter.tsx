import Image from "next/image";
import Link from "next/link";
import { IconBrandGithub } from "@tabler/icons-react";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <Link className="footer-brand" href="/" aria-label="Kwenta home">
          <Image src="/web-logo.png" alt="Kwenta" width={140} height={51} />
        </Link>
        <nav aria-label="Footer navigation">
          <Link href="/">Home</Link>
          <Link href="/universities">Universities</Link>
          <Link href="/information#methodology">Methodology</Link>
          <Link href="/information#about">About</Link>
          <Link href="/information#privacy">Privacy</Link>
          <a href="https://ranierteraldico.me">Portfolio</a>
        </nav>
        <div className="footer-socials" aria-label="Ranier Teraldico on social media">
          <a href="https://github.com/tradzSE" target="_blank" rel="noreferrer" aria-label="GitHub"><IconBrandGithub size={25} stroke={1.8} aria-hidden="true" /></a>
        </div>
      </div>
      <div className="footer-pattern" aria-hidden="true" />
      <div className="footer-legal"><span>© 2026 Kwenta</span><span>Built by Ranier Teraldico</span></div>
    </footer>
  );
}
