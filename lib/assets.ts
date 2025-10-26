import path from "node:path";
import fs from "node:fs";
/**
 * Assets helper
 *
 * Conventions (Option 2 - local assets):
 * - Put files under public/assets following the key from Gist/Sheets.
 *   For example:
 *     companyLogo: "/02_oxygenai/logo" => public/assets/02_oxygenai/logo.{png|jpg|jpeg|webp|svg}
 *     promoMaterials: "/02_oxygenai/promo_materials" => public/assets/02_oxygenai/promo_materials/*
 * - Filenames inside promo_materials do NOT need to share the same name. Any
 *   valid image extension or .pdf is picked up automatically.
 * - Ordering: we sort filenames lexicographically with numeric-aware compare.
 *   If you want a stable order, prefix filenames: 01_..., 02_..., or 1-, 2-, etc.
 * - Supported image extensions: png, jpg, jpeg, webp, svg, gif, avif
 * - PDFs are rendered as links with a small PDF badge in the test page.
 * - Unknown extensions are ignored in promo listings for now.
 */

// Base URL path served by Next.js for assets under public/
const ASSET_BASE = process.env.NEXT_PUBLIC_ASSET_BASE ?? "/assets";

// Filesystem root for public assets (server-side only)
const PUBLIC_DIR = path.join(process.cwd(), "public");

const DEFAULT_LOGO = "/placeholder-company.svg";

/**
 * Resolve a company logo path stored as a folder-like key from the sheet/Gist.
 * Convention: store files under public/assets/<key>/logo.(png|jpg|jpeg|webp|svg)
 * Primary (preferred) layout: public/assets/<key>/logo/logo.(png|jpg|jpeg|webp|svg)
 * Example:
 *   - key "/02_oxygenai/logo" -> public/assets/02_oxygenai/logo/logo.png
 *   - also supports: public/assets/02_oxygenai/logo.png and public/assets/02_oxygenai/logo.<ext>
 */
export function resolveLocalLogo(key?: string): string {
  if (!key) return DEFAULT_LOGO;
  // Normalize "folder-ish" key: "/02_oxygenai/logo" => ["02_oxygenai","logo"]
  const clean = key.replace(/^\/+/, ""); // drop leading slash
  const parts = clean.split("/");

  // Build candidate filenames in priority order
  const exts = ["png", "jpg", "jpeg", "webp", "svg"];
  // Determine folder path once
  const folderAbs = path.join(PUBLIC_DIR, "assets", ...parts);

  // 1) Preferred: nested "logo" directory with an image inside, e.g. assets/<parts>/logo/logo.png
  const nestedLogoDir = path.join(folderAbs, "logo");
  if (fs.existsSync(nestedLogoDir) && fs.statSync(nestedLogoDir).isDirectory()) {
    const nested = fs
      .readdirSync(nestedLogoDir)
      .filter((f) => exts.includes(path.extname(f).toLowerCase().replace(/^\./, "")))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    if (nested.length > 0) {
      return path.posix.join(ASSET_BASE, clean, "logo", nested[0]);
    }
  }

  // 2) File named "logo" inside the folder: assets/<parts...>/logo.<ext>
  for (const ext of exts) {
    const relFs = path.join("assets", ...parts, `logo.${ext}`);
    const absFs = path.join(PUBLIC_DIR, relFs);
    if (fs.existsSync(absFs)) {
      return path.posix.join(ASSET_BASE, clean, `logo.${ext}`);
    }
  }

  // 3) Direct file: assets/<parts...>.<ext>
  for (const ext of exts) {
    const relFs = path.join("assets", ...parts) + "." + ext; // e.g. assets/02_oxygenai/logo.png
    const absFs = path.join(PUBLIC_DIR, relFs);
    if (fs.existsSync(absFs)) {
      // Return public URL path
      return path.posix.join(ASSET_BASE, ...parts) + "." + ext;
    }
  }

  // 4) If <parts...> is a directory, pick the first supported image file in it
  if (fs.existsSync(folderAbs) && fs.statSync(folderAbs).isDirectory()) {
    const files = fs
      .readdirSync(folderAbs)
      .filter((f) => exts.includes(path.extname(f).toLowerCase().replace(/^\./, "")))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    if (files.length > 0) {
      return path.posix.join(ASSET_BASE, clean, files[0]);
    }
  }
  return DEFAULT_LOGO;
}

/**
 * Resolve a gallery of promo images given a folder-like key.
 * Convention: put images under public/assets/<key>/*.(png|jpg|jpeg|webp|svg)
 * Example key: "/02_oxygenai/promo_materials"
 */
export function resolvePromoImages(key?: string): string[] {
  if (!key) return [];
  const clean = key.replace(/^\/+/, "");
  const folderRel = path.join("assets", clean);
  const folderAbs = path.join(PUBLIC_DIR, folderRel);

  if (!fs.existsSync(folderAbs) || !fs.statSync(folderAbs).isDirectory()) {
    return [];
  }

  const exts = new Set([".png", ".jpg", ".jpeg", ".webp", ".svg"]);
  const files = fs
    .readdirSync(folderAbs)
    .filter((f) => exts.has(path.extname(f).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  return files.map((f) => path.posix.join(ASSET_BASE, clean, f));
}

export type PromoAsset = {
  url: string;
  name: string;
  ext: string; // lowercased ext with dot, e.g. ".png", ".pdf"
  kind: "image" | "pdf" | "other";
};

const IMAGE_EXTS = new Set([".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif", ".avif"]);
const PDF_EXTS = new Set([".pdf"]);

/**
 * Return all assets under a promo folder, categorized for rendering.
 */
export function resolvePromoAssets(key?: string): PromoAsset[] {
  if (!key) return [];
  const clean = key.replace(/^\/+/, "");
  const folderRel = path.join("assets", clean);
  const folderAbs = path.join(PUBLIC_DIR, folderRel);

  if (!fs.existsSync(folderAbs) || !fs.statSync(folderAbs).isDirectory()) {
    return [];
  }

  const files = fs
    .readdirSync(folderAbs)
    .filter((f) => !fs.statSync(path.join(folderAbs, f)).isDirectory())
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  const assets = files.map((f) => {
    const ext = path.extname(f).toLowerCase();
    const url = path.posix.join(ASSET_PUBLIC_BASE, clean, f);
    const kind: PromoAsset["kind"] = IMAGE_EXTS.has(ext)
      ? "image"
      : PDF_EXTS.has(ext)
      ? "pdf"
      : "other";
    return { url, name: f, ext, kind };
  });

  // Sort so that PDFs are always last; keep a stable lexical order within each kind
  const priority = (k: PromoAsset["kind"]) => (k === "pdf" ? 1 : 0);
  assets.sort((a, b) => {
    const pa = priority(a.kind);
    const pb = priority(b.kind);
    if (pa !== pb) return pa - pb;
    return a.name.localeCompare(b.name, undefined, { numeric: true });
  });

  return assets;
}

/**
 * Export base so UI can render helpful notes if needed.
 */
export const ASSET_PUBLIC_BASE = ASSET_BASE;
