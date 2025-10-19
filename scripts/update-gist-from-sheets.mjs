import crypto from "node:crypto";
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

function sha256(str) {
  return crypto.createHash("sha256").update(str).digest("hex");
}

async function getGist() {
  const res = await fetch(`https://api.github.com/gists/${GIST_ID}`);
  if (!res.ok) throw new Error(`Failed to read gist ${GIST_ID}`);
  return res.json();
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

  const companiesJson = toJsonString(companiesCsv);
  const jobsJson = toJsonString(jobsCsv);
  const majorsJson = majorsCsv ? toJsonString(majorsCsv) : undefined;
  const jobTypesJson = jobTypesCsv ? toJsonString(jobTypesCsv) : undefined;

  const gist = await getGist();
  const currentCompanies = gist.files["companies.json"]?.content || "";
  const currentJobs = gist.files["jobs.json"]?.content || "";
  const currentMajors = gist.files["majors.json"]?.content || "";
  const currentJobTypes = gist.files["jobTypes.json"]?.content || "";

  const changes = {};
  if (sha256(currentCompanies) !== sha256(companiesJson)) {
    changes["companies.json"] = { content: companiesJson };
  }
  if (sha256(currentJobs) !== sha256(jobsJson)) {
    changes["jobs.json"] = { content: jobsJson };
  }
  if (majorsJson && sha256(currentMajors) !== sha256(majorsJson)) {
    changes["majors.json"] = { content: majorsJson };
  }
  if (jobTypesJson && sha256(currentJobTypes) !== sha256(jobTypesJson)) {
    changes["jobTypes.json"] = { content: jobTypesJson };
  }

  if (Object.keys(changes).length === 0) {
    console.log("No changes detected. Exiting.");
    return;
  }

  await updateGist(changes);
  console.log(
    `Updated gist ${GIST_ID} with ${Object.keys(changes).join(", ")}`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
