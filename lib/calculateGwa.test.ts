import { describe, expect, it } from "vitest";
import { clsu } from "@/data/universities/clsu";
import { feu } from "@/data/universities/feu";
import { calculateGwa, type Subject } from "@/lib/calculateGwa";

const subject = (grade: string, units: string): Subject => ({ id: crypto.randomUUID(), name: "Test", grade, units });

describe("calculateGwa", () => {
  it("calculates a unit-weighted result", () => {
    const result = calculateGwa([subject("1", "3"), subject("2", "1")], clsu);
    expect(result.value).toBe(1.25);
    expect(result.includedUnits).toBe(4);
  });

  it("excludes non-numeric grades marked for exclusion", () => {
    const result = calculateGwa([subject("1.5", "3"), subject("D", "3")], clsu);
    expect(result.value).toBe(1.5);
    expect(result.includedUnits).toBe(3);
  });

  it("reports unresolved grades as blockers", () => {
    const unresolved = subject("Inc", "3");
    const result = calculateGwa([subject("1.5", "3"), unresolved], clsu);
    expect(result.blockers).toEqual([unresolved]);
  });

  it("ignores zero, negative, and invalid unit values", () => {
    const result = calculateGwa([subject("1", "0"), subject("1.5", "-3"), subject("2", "abc")], clsu);
    expect(result.value).toBeNull();
    expect(result.includedUnits).toBe(0);
  });

  it("detects failures on lower-is-better scales", () => {
    const result = calculateGwa([subject("5", "3")], clsu);
    expect(result.hasFailingGrade).toBe(true);
    expect(result.worstNumericGrade).toBe(5);
  });

  it("detects failures and the worst grade on higher-is-better scales", () => {
    const result = calculateGwa([subject("A", "3"), subject("F", "3")], feu);
    expect(result.hasFailingGrade).toBe(true);
    expect(result.worstNumericGrade).toBe(0);
  });
});
