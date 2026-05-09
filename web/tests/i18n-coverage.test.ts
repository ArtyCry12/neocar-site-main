import { describe, expect, it } from "vitest";

import en from "@/messages/en";
import ro from "@/messages/ro";
import ru from "@/messages/ru";

function leafPaths(obj: unknown, prefix = ""): Set<string> {
  if (obj === null || typeof obj !== "object") {
    return new Set(prefix ? [prefix] : []);
  }
  if (Array.isArray(obj)) {
    return new Set(prefix ? [prefix] : []);
  }
  const next = obj as Record<string, unknown>;
  const out = new Set<string>();
  for (const key of Object.keys(next)) {
    const p = prefix ? `${prefix}.${key}` : key;
    const val = next[key];
    if (val !== null && typeof val === "object" && !Array.isArray(val)) {
      for (const x of leafPaths(val, p)) out.add(x);
    } else {
      out.add(p);
    }
  }
  return out;
}

describe("i18n parity", () => {
  it("ru / ro / en share the same message key paths", () => {
    const a = leafPaths(ru);
    const b = leafPaths(ro);
    const c = leafPaths(en);
    expect([...a].sort()).toEqual([...b].sort());
    expect([...a].sort()).toEqual([...c].sort());
  });
});
