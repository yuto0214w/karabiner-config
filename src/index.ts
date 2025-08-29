import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { map, rule, ifApp, complexModifications } from "karabiner.ts";

const dryRun = false;

const moonlightRegex = /^com\.moonlight-stream\.Moonlight$/;
const rules = [
  rule("Remap backslash to option+backslash").manipulators([
    map("international3").to("international3", "option").condition(ifApp(moonlightRegex).unless()),
  ]),
  rule("Remap option+backslash to backslash").manipulators([
    map("international3", "option").to("international3").condition(ifApp(moonlightRegex).unless()),
  ]),
  rule("Remap backslash to f16 for Moonlight").manipulators([
    map("international3", "optionalAny").to("f16").condition(ifApp(moonlightRegex)),
  ]),
  rule("Remap underscore to f17 for Moonlight").manipulators([
    map("international1", "optionalAny").to("f17").condition(ifApp(moonlightRegex)),
  ]),
];

(dryRun ? console.log : fs.writeFileSync)(
  path.join(os.homedir(), ".config/karabiner/assets/complex_modifications/yuto-config.json"),
  JSON.stringify({
    title: "yutoの設定だよ",
    ...complexModifications(rules),
  }),
);
