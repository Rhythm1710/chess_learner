import { describe, expect, it } from "vitest";
import manifest from "@/app/manifest";

describe("web app manifest", () => {
  const data = manifest();

  it("installs as a standalone app", () => {
    expect(data.display).toBe("standalone");
    expect(data.start_url).toBe("/analysis");
    expect(data.theme_color).toBe("#101210");
    expect(data.background_color).toBe("#101210");
  });

  it("ships 192 and 512 icons plus a maskable icon", () => {
    const icons = data.icons ?? [];
    expect(icons.map((icon) => `${icon.sizes}:${icon.purpose}`)).toEqual([
      "192x192:any",
      "512x512:any",
      "512x512:maskable",
    ]);
  });
});
