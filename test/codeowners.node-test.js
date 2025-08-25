// @ts-check

import { test } from "node:test";
import * as assert from "node:assert"

import { Codeowners } from "../dist/codeowners.js";

const repos = new Codeowners();

test("sanity check", () => {
  const owner = repos.getOwner('test/codeowners.test.ts');
  assert.deepEqual(owner, ["@noahm"]);
});
