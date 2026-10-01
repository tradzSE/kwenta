"use client";

import Image from "next/image";
import { useState } from "react";

export default function UniversityMark({ logoSrc, shortName, size = 44 }: { logoSrc?: string; shortName: string; size?: number }) {
  const [imageFailed, setImageFailed] = useState(false);

  if (logoSrc && !imageFailed) return <Image className="university-logo" src={logoSrc} alt="" width={size} height={size} onError={() => setImageFailed(true)} />;
  return <span className="university-logo university-logo-fallback" aria-hidden="true">{shortName.slice(0, 2)}</span>;
}
