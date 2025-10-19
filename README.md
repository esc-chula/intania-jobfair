This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Data sync via GitHub Gist (nightly)

This project fetches data from a GitHub Gist at runtime and revalidates daily. A GitHub Actions workflow updates the Gist nightly from Google Sheets CSV exports.

1. Create a fine‑grained PAT with `gist` scope; add to repo secrets as `GIST_TOKEN`.
2. Create a Gist containing `companies.json`, `jobs.json` (and optionally `majors.json`, `jobTypes.json`). Add its ID to repo secrets as `GIST_ID`.
3. Add repository variables with public CSV export links:
   - `COMPANIES_CSV_URL`, `JOBS_CSV_URL`, `MAJORS_CSV_URL`, `JOBTYPES_CSV_URL`.
4. Set env in Vercel: `NEXT_PUBLIC_GIST_RAW_BASE=https://gist.githubusercontent.com/<user>/<gist-id>/raw`.
5. The site fetches from the Gist raw URLs with ISR (revalidate every 86400s).

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
