"use client";

import { useEffect, useMemo, useState } from "react";
import type { UniversityConfig } from "@/data/universities/types";
import { calculateGwa, type Subject } from "@/lib/calculateGwa";
import { getAcademicStanding } from "@/lib/getAcademicStanding";

const makeId = () => (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function" ? crypto.randomUUID() : `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`);
const makeSubject = (): Subject => ({ id: makeId(), name: "", grade: "", units: "3" });
type SavedTerm = { id: string; name: string; gwa: number; units: number; savedAt: string };

const loadCanvasImage = (src: string) => new Promise<HTMLImageElement>((resolve, reject) => {
  const image = new Image();
  image.crossOrigin = "anonymous";
  image.onload = () => resolve(image);
  image.onerror = reject;
  image.src = src;
});

const drawContainedImage = (context: CanvasRenderingContext2D, image: HTMLImageElement, x: number, y: number, width: number, height: number) => {
  const scale = Math.min(width / image.naturalWidth, height / image.naturalHeight);
  const renderedWidth = image.naturalWidth * scale;
  const renderedHeight = image.naturalHeight * scale;
  context.drawImage(image, x + (width - renderedWidth) / 2, y + (height - renderedHeight) / 2, renderedWidth, renderedHeight);
};

export default function Calculator({ university }: { university: UniversityConfig }) {
  const storageKey = `gwa-calculator:${university.slug}:subjects`;
  const historyKey = `gwa-calculator:${university.slug}:history`;
  const [subjects, setSubjects] = useState<Subject[]>(() => [makeSubject(), makeSubject(), makeSubject(), makeSubject()]);
  const [termName, setTermName] = useState("First semester");
  const [history, setHistory] = useState<SavedTerm[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const saved = localStorage.getItem(storageKey);
      const savedHistory = localStorage.getItem(historyKey);
      if (saved) {
        try { setSubjects(JSON.parse(saved)); } catch { localStorage.removeItem(storageKey); }
      }
      if (savedHistory) {
        try { setHistory(JSON.parse(savedHistory)); } catch { localStorage.removeItem(historyKey); }
      }
      setLoaded(true);
    }, 0);
    return () => window.clearTimeout(timeout);
  }, [historyKey, storageKey]);

  useEffect(() => {
    if (loaded) localStorage.setItem(storageKey, JSON.stringify(subjects));
  }, [loaded, storageKey, subjects]);

  useEffect(() => {
    if (loaded) localStorage.setItem(historyKey, JSON.stringify(history));
  }, [history, historyKey, loaded]);

  const result = useMemo(() => calculateGwa(subjects, university), [subjects, university]);
  const update = (id: string, field: keyof Subject, value: string) => setSubjects((current) => current.map((subject) => subject.id === id ? { ...subject, [field]: value } : subject));
  const remove = (id: string) => setSubjects((current) => current.length === 1 ? current : current.filter((subject) => subject.id !== id));
  const reset = () => window.confirm("Clear all subjects saved on this device?") && setSubjects([makeSubject(), makeSubject(), makeSubject(), makeSubject()]);
  const saveTerm = () => {
    if (result.value === null || result.blockers.length) return;
    setHistory((current) => [{ id: makeId(), name: termName.trim() || "Untitled term", gwa: result.value!, units: result.includedUnits, savedAt: new Date().toISOString() }, ...current]);
  };
  const totalHistoryUnits = history.reduce((total, term) => total + term.units, 0);
  const cumulative = totalHistoryUnits ? history.reduce((total, term) => total + term.gwa * term.units, 0) / totalHistoryUnits : null;
  const shareResult = async () => {
    if (result.value === null || result.blockers.length) return;
    const gwa = result.value.toFixed(university.roundingDecimals);
    const size = 1080;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const primary = university.brandColors?.primary ?? "#145c3b";
    const secondary = university.brandColors?.secondary ?? "#dce8cf";
    ctx.fillStyle = "#f7f5ed";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = primary;
    ctx.fillRect(0, 0, 30, size);

    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = primary;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.roundRect(76, 72, 190, 190, 24);
    ctx.fill();
    ctx.stroke();

    if (university.logoSrc) {
      try {
        const logo = await loadCanvasImage(university.logoSrc);
        drawContainedImage(ctx, logo, 101, 97, 140, 140);
      } catch {
        ctx.fillStyle = primary;
        ctx.textAlign = "center";
        ctx.font = "700 44px Arial, sans-serif";
        ctx.fillText(university.shortName, 171, 185, 145);
      }
    }

    ctx.textAlign = "left";
    ctx.fillStyle = "#15231b";
    ctx.font = "700 54px Arial, sans-serif";
    ctx.fillText(university.shortName, 306, 132);
    ctx.fillStyle = "#4f5c54";
    ctx.font = "32px Arial, sans-serif";
    ctx.fillText(university.calculatorName, 306, 186, 690);
    ctx.fillStyle = primary;
    ctx.font = "700 30px Arial, sans-serif";
    ctx.fillText("KWENTA · GWA MADE SIMPLE", 306, 238);

    ctx.strokeStyle = "#cbd3c9";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(76, 306);
    ctx.lineTo(1004, 306);
    ctx.stroke();

    ctx.fillStyle = "#4f5c54";
    ctx.font = "700 30px Arial, sans-serif";
    ctx.fillText(`ESTIMATED ${university.resultLabel.toUpperCase()}`, 76, 390);
    ctx.fillStyle = "#15261b";
    ctx.font = "700 220px Arial, sans-serif";
    ctx.fillText(gwa, 68, 610);
    ctx.fillStyle = "#5e6c62";
    ctx.font = "36px Arial, sans-serif";
    ctx.fillText(`${result.includedUnits} included units`, 82, 682);

    if (academicStanding?.label) {
      ctx.fillStyle = secondary === "#FFFFFF" ? "#eef2ec" : `${secondary}55`;
      ctx.strokeStyle = primary;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(76, 746, 928, 134, 18);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = primary;
      ctx.font = "700 26px Arial, sans-serif";
      ctx.fillText("ACADEMIC STANDING", 110, 797);
      ctx.fillStyle = "#15231b";
      ctx.font = "700 42px Arial, sans-serif";
      ctx.fillText(academicStanding.label, 110, 850, 850);
    }

    const footerY = academicStanding?.label ? 962 : 850;
    ctx.strokeStyle = "#cbd3c9";
    ctx.beginPath();
    ctx.moveTo(76, footerY - 52);
    ctx.lineTo(1004, footerY - 52);
    ctx.stroke();
    ctx.fillStyle = "#5e6c62";
    ctx.font = "30px Arial, sans-serif";
    ctx.fillText("kwenta.ranierteraldico.me", 76, footerY);
    ctx.textAlign = "right";
    ctx.fillStyle = primary;
    ctx.font = "700 30px Arial, sans-serif";
    ctx.fillText(university.name, 1004, footerY, 520);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
    if (!blob) return;
    const file = new File([blob], `kwenta-${university.slug}-${gwa}.png`, { type: "image/png" });
    if (navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: `My estimated GWA: ${gwa}` });
        return;
      } catch { /* user cancelled — fall through to download */ }
    }
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = file.name;
    link.click();
    URL.revokeObjectURL(link.href);
  };
  const exportCsv = () => {
    const rows = [["Subject", "Grade", "Units"], ...subjects.filter((subject) => subject.grade).map((subject) => [subject.name, subject.grade, subject.units]), ["Estimated GWA", result.value?.toFixed(university.roundingDecimals) ?? "Pending", String(result.includedUnits)]];
    const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    link.download = `${university.slug}-${termName.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "gwa"}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const academicStanding = getAcademicStanding(result, university);

  return (
    <div className="calculator-shell">
      <section className="worksheet" aria-labelledby="subjects-title">
        <div className="section-heading"><h2 id="subjects-title">Your subjects</h2><button type="button" className="text-button" onClick={reset}>Clear all</button></div>
        <div className="subject-table">
          <div className="subject-header" aria-hidden="true"><span>Subject</span><span>Grade</span><span>Units</span><span /></div>
          {subjects.map((subject, index) => (
            <div className="subject-row" key={subject.id}>
              <label><span className="mobile-label">Subject</span><input aria-label={`Subject ${index + 1} name`} value={subject.name} onChange={(event) => update(subject.id, "name", event.target.value)} placeholder={`Subject ${index + 1}`} /></label>
              <label><span className="mobile-label">Grade</span><select aria-label={`Subject ${index + 1} grade`} value={subject.grade} onChange={(event) => update(subject.id, "grade", event.target.value)}><option value="">Select</option>{university.gradeOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
              <label><span className="mobile-label">Units</span><input aria-label={`Subject ${index + 1} units`} type="number" inputMode="decimal" min="0" step="0.5" value={subject.units} onChange={(event) => update(subject.id, "units", event.target.value)} /></label>
              <button type="button" className="remove-button" onClick={() => remove(subject.id)} aria-label={`Remove subject ${index + 1}`}>×</button>
            </div>
          ))}
        </div>
        <div className="worksheet-actions"><button type="button" className="add-button" onClick={() => setSubjects((current) => [...current, makeSubject()])}>+ Add subject</button><button type="button" className="text-button" onClick={exportCsv}>Export CSV</button></div>
      </section>

      <aside className="result-card" aria-live="polite">
        <div className="result-value"><span>Estimated {university.resultLabel}</span><strong>{result.blockers.length ? "Pending" : result.value === null ? "—" : result.value.toFixed(university.roundingDecimals)}</strong><small>{result.includedUnits || 0} included units</small></div>
        {academicStanding?.label && <div className="result-standing"><span>Standing</span><strong>{academicStanding.label}</strong><small>{university.scholarshipRules?.eligibilityNote ?? "Based on the grades and units entered"}</small></div>}
        {result.blockers.length > 0 && <p>Resolve all incomplete or no-grade marks to calculate your result.</p>}
        {academicStanding && !academicStanding.label && <p>{!academicStanding.meetsUnits ? `At least ${university.scholarshipRules?.minimumUnits} units are required for scholar classification.` : !academicStanding.hasClearGrades ? "A failing or unresolved grade prevents scholar classification." : "No academic distinction for this result."}</p>}
        {result.value !== null && !result.blockers.length && (
          <button type="button" className="share-button" onClick={shareResult}>Share result</button>
        )}
      </aside>

      <section className="term-history" aria-labelledby="term-history-title">
        <div className="section-heading"><h2 id="term-history-title">Saved semesters</h2></div>
        <div className="save-term-row"><label><span>Semester name</span><input value={termName} onChange={(event) => setTermName(event.target.value)} placeholder="e.g. First semester 2026" /></label><button type="button" className="add-button" disabled={result.value === null || Boolean(result.blockers.length)} onClick={saveTerm}>Save result</button></div>
        {history.length > 0 && <div className="history-list"><div className="cumulative-result"><span>Saved cumulative estimate</span><strong>{cumulative?.toFixed(university.roundingDecimals) ?? "—"}</strong></div>{history.map((term) => <div className="history-row" key={term.id}><div><strong>{term.name}</strong><span>{term.units} units · {new Date(term.savedAt).toLocaleDateString()}</span></div><b>{term.gwa.toFixed(university.roundingDecimals)}</b><button type="button" className="remove-button" aria-label={`Remove ${term.name}`} onClick={() => setHistory((current) => current.filter((item) => item.id !== term.id))}>×</button></div>)}</div>}
      </section>
    </div>
  );
}
