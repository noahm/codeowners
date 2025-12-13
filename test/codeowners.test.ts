import { describe, expect, it } from "bun:test";

import { Codeowners } from "../src/codeowners";

const repos = new Codeowners();

describe("codeowners", () => {
  it("returns owners for file", () => {
    const owner = repos.getOwner(import.meta.path);
    expect(owner).toEqual(["@noahm"]);
  });

  it("owners is a copy of internal data", () => {
    repos.getOwner(import.meta.path).pop();

    const owner = repos.getOwner(import.meta.path);
    expect(owner).toEqual(["@noahm"]);
  });

  it("returns any listed paths which do not exist", () => {
    expect(repos.getOrphanedEntries().map((e) => e.path)).toContainAllValues(["non-existent"]);
  });
});

describe("metadata", () => {
  it("parses metadata", () => {
    const metadata = repos.contactInfo;
    expect(metadata).toMatchSnapshot();
  });
});
