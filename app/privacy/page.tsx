import type { Metadata } from "next";
export const metadata: Metadata = { title: "Privacy", description: "Privacy information for Kwenta." };
export default function PrivacyPage() { return <article className="text-page prose-page"><p className="kicker">Privacy</p><h1>Your grades stay on your device.</h1><p>The calculator does not require an account and does not send subject names, grades, or units to a server. Saved calculator data uses your browser’s local storage.</p><p>You can remove saved information at any time by using Reset or clearing site data in your browser.</p></article>; }
