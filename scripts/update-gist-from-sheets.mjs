import { parse } from "csv-parse/sync";

const env = (name, required = true) => {
  const v = process.env[name];
  if (required && !v) {
    console.error(`Missing env: ${name}`);
    process.exit(1);
  }
  return v || "";
};

const GIST_TOKEN = env("GIST_TOKEN");
const GIST_ID = env("GIST_ID");
const COMPANIES_CSV_URL = env("COMPANIES_CSV_URL");
const JOBS_CSV_URL = env("JOBS_CSV_URL");
const MAJORS_CSV_URL = env("MAJORS_CSV_URL", false);
const JOBTYPES_CSV_URL = env("JOBTYPES_CSV_URL", false);

async function fetchCsv(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch CSV: ${url}`);
  const text = await res.text();
  return parse(text, { columns: true, trim: true, skip_empty_lines: true });
}

function toJsonString(data) {
  return JSON.stringify(data, null, 2);
}

async function updateGist(files) {
  const res = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${GIST_TOKEN}`,
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: JSON.stringify({ files }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Gist update failed: ${res.status} ${body}`);
  }
}

async function main() {
  const [companiesCsv, jobsCsv, majorsCsv, jobTypesCsv] = await Promise.all([
    fetchCsv(COMPANIES_CSV_URL),
    fetchCsv(JOBS_CSV_URL),
    MAJORS_CSV_URL ? fetchCsv(MAJORS_CSV_URL) : Promise.resolve(null),
    JOBTYPES_CSV_URL ? fetchCsv(JOBTYPES_CSV_URL) : Promise.resolve(null),
  ]);

  const files = {
    "companies.json": { content: toJsonString(companiesCsv) },
    "jobs.json": { content: toJsonString(jobsCsv) },
  };

  if (majorsCsv) {
    files["majors.json"] = { content: toJsonString(majorsCsv) };
  }
  if (jobTypesCsv) {
    files["jobTypes.json"] = { content: toJsonString(jobTypesCsv) };
  }

  await updateGist(files);
  console.log(
    `Updated gist ${GIST_ID} with ${Object.keys(files).join(", ")}`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
