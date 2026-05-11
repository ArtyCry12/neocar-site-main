export function canRender3D(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return false;
  }
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  if (mem !== undefined && mem < 4) {
    return false;
  }
  try {
    const testCanvas = document.createElement("canvas");
    const gl =
      testCanvas.getContext("webgl2") ?? testCanvas.getContext("webgl");
    if (!gl) return false;
  } catch {
    return false;
  }
  return true;
}
