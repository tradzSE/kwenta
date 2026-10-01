import { describe, expect, it } from "vitest";
import { clsu } from "@/data/universities/clsu";
import { feu } from "@/data/universities/feu";
import { calculateGwa, type Subject } from "@/lib/calculateGwa";
import { getAcademicStanding } from "@/lib/getAcademicStanding";

const subjects = (grade: string, count = 5): Subject[] => Array.from({ length: count }, (_, index) => ({ id: String(index), name: `Subject ${index + 1}`, grade, units: "3" }));

describe("getAcademicStanding", () => {
  it("classifies lower-is-better university thresholds", () => {
    const standing = getAcademicStanding(calculateGwa(subjects("1.5"), clsu), clsu);
    expect(standing?.label).toBe("University Scholar");
  });

  it("classifies lower-is-better college thresholds", () => {
    const standing = getAcademicStanding(calculateGwa(subjects("1.75"), clsu), clsu);
    expect(standing?.label).toBe("College Scholar");
  });

  it("requires the configured minimum units", () => {
    const standing = getAcademicStanding(calculateGwa(subjects("1.25", 4), clsu), clsu);
    expect(standing).toMatchObject({ label: null, meetsUnits: false });
  });

  it("rejects classification when a blocking grade exists", () => {
    const entries = [...subjects("1.25"), { id: "blocked", name: "Pending", grade: "Inc", units: "3" }];
    const standing = getAcademicStanding(calculateGwa(entries, clsu), clsu);
    expect(standing).toMatchObject({ label: null, hasClearGrades: false });
  });

  it("classifies higher-is-better thresholds", () => {
    const standing = getAcademicStanding(calculateGwa(subjects("A"), feu), feu);
    expect(standing?.label).toBe("Dean's List - First Honors");
  });
});
