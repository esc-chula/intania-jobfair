// import fs from "node:fs";
// import path from "node:path";
// import { parse } from "csv-parse";

// /**
//  * Usage:
//  *   node scripts/convert-sheets-to-json.mjs ./input.csv ./output.json
//  */
// const [, , inputPath, outputPath] = process.argv;

// if (!inputPath || !outputPath) {
//   console.error(
//     "Usage: node scripts/convert-sheets-to-json.mjs <input.csv> <output.json>"
//   );
//   process.exit(1);
// }

// const rows = [];
// fs.createReadStream(path.resolve(inputPath))
//   .pipe(parse({ columns: true, skip_empty_lines: true, trim: true }))
//   .on("data", (row) => rows.push(row))
//   .on("end", () => {
//     fs.writeFileSync(
//       path.resolve(outputPath),
//       JSON.stringify(rows, null, 2),
//       "utf-8"
//     );
//     console.log(`Wrote ${rows.length} records to ${outputPath}`);
//   })
//   .on("error", (err) => {
//     console.error(err);
//     process.exit(1);
//   });
