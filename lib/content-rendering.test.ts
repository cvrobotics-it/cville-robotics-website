import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import test from "node:test";

test("already-published empty newsletter content renders without crashing", async () => {
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||= "test1234";
  process.env.NEXT_PUBLIC_SANITY_DATASET ||= "production";
  const { default: ProseableText } =
    await import("../components/proseable-text");
  assert.equal(
    renderToStaticMarkup(createElement(ProseableText, { value: [] })),
    "",
  );
});
