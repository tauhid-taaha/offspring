import "server-only";
import fs from "node:fs";
import path from "node:path";

const EXTENSIONS = ["webp", "avif", "jpg", "jpeg", "png"];

/**
 * Drop-in image lookup. Returns the public URL of
 *   public/images/<dir>/<name>.<webp|avif|jpg|jpeg|png>
 * if the file exists, otherwise null (the UI then shows a designed fallback).
 *
 * Dev server: picked up on refresh. Production: picked up at the next `npm run build`.
 */
export function findImage(dir: string, name: string): string | null {
  for (const ext of EXTENSIONS) {
    const rel = `/images/${dir}/${name}.${ext}`;
    if (fs.existsSync(path.join(process.cwd(), "public", rel))) return rel;
  }
  return null;
}
