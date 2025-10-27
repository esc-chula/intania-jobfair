import path from "node:path";
import fs from "node:fs";


const ASSET_BASE = process.env.NEXT_PUBLIC_ASSET_BASE ?? "/assets";

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

  const clean = key.replace(/^\/+/, ""); 
  const parts = clean.split("/");

  const exts = ["png", "jpg", "jpeg", "webp", "svg"];

  const folderAbs = path.join(PUBLIC_DIR, "assets", ...parts);

  // 1) Preferred: e.g. assets/<parts>/logo/logo.png
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
    const relFs = path.join("assets", ...parts) + "." + ext; // e.g. assets/company_name/logo.png
    const absFs = path.join(PUBLIC_DIR, relFs);
    if (fs.existsSync(absFs)) {
      // Return public URL path
      return path.posix.join(ASSET_BASE, ...parts) + "." + ext;
    }
  }

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

  // PDFs are in the end
  const priority = (k: PromoAsset["kind"]) => (k === "pdf" ? 1 : 0);
  assets.sort((a, b) => {
    const pa = priority(a.kind);
    const pb = priority(b.kind);
    if (pa !== pb) return pa - pb;
    return a.name.localeCompare(b.name, undefined, { numeric: true });
  });

  return assets;
}

export const ASSET_PUBLIC_BASE = ASSET_BASE;
