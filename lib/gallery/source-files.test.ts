import assert from "node:assert/strict";
import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { listAlbumImagePaths, removeUploadedSources } from "./source-files";

test("album discovery includes deeply nested images and preserves other file types", async (context) => {
  const directory = await fs.mkdtemp(
    path.join(os.tmpdir(), "cville-gallery-test-"),
  );
  context.after(() => fs.rm(directory, { recursive: true, force: true }));
  await fs.mkdir(path.join(directory, "day1", "raw"), { recursive: true });
  const first = path.join(directory, "first.jpg");
  const nested = path.join(directory, "day1", "raw", "second.PNG");
  const notes = path.join(directory, "notes.txt");
  await Promise.all([
    fs.writeFile(first, "test image"),
    fs.writeFile(nested, "test image"),
    fs.writeFile(notes, "Keep these notes"),
  ]);
  const images = await listAlbumImagePaths(directory);
  assert.deepEqual(images, [nested, first]);
  await removeUploadedSources([first]);
  assert.equal(await fs.readFile(nested, "utf8"), "test image");
  assert.equal(await fs.readFile(notes, "utf8"), "Keep these notes");
  await assert.rejects(fs.stat(first), { code: "ENOENT" });
});

test("directory read errors abort discovery instead of making a partial album look complete", async (context) => {
  const directory = await fs.mkdtemp(
    path.join(os.tmpdir(), "cville-gallery-test-"),
  );
  context.after(() => fs.rm(directory, { recursive: true, force: true }));
  await assert.rejects(listAlbumImagePaths(path.join(directory, "missing")), {
    code: "ENOENT",
  });
});
