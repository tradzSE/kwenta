export default function UniversityMark({
  shortName,
  brandColor,
  size = 44,
}: {
  shortName: string;
  brandColor?: string;
  size?: number;
}) {
  return (
    <span
      className="university-logo university-logo-fallback"
      style={{ color: brandColor, fontSize: Math.max(12, size * 0.42) }}
      aria-hidden="true"
    >
      {shortName.slice(0, 2)}
    </span>
  );
}
