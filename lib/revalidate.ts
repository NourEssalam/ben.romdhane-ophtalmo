import { revalidatePath } from "next/cache";
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
  PayloadRequest,
} from "payload";

/**
 * A path to revalidate: a literal page path, or `[path, "layout"]` to
 * invalidate a layout and every page beneath it.
 * Signature checked against Next 16.4.6: revalidatePath(path, type?: "page" | "layout").
 */
export type RevalidateTarget = string | [string, "page" | "layout"];

/** Every page (header nav, contact footer and metadata live in the root layout). */
export const ALL_PAGES: RevalidateTarget = ["/", "layout"];
// Home lives at app/(frontend)/[locale]/page.tsx; this revalidates it for every locale.
export const HOME: RevalidateTarget = ["/[locale]", "page"];

function revalidate(targets: RevalidateTarget[], req: PayloadRequest) {
  for (const target of targets) {
    const [path, type] = typeof target === "string" ? [target, undefined] : target;
    try {
      revalidatePath(path, type);
    } catch (err) {
      // revalidatePath throws outside a Next.js request (e.g. `pnpm seed`).
      // Nothing is cached there, so skipping is safe.
      req.payload.logger.warn(
        `revalidatePath(${path}${type ? `, ${type}` : ""}) skipped: ${(err as Error).message}`,
      );
    }
  }
}

export const collectionRevalidate = (...targets: RevalidateTarget[]) => {
  const afterChange: CollectionAfterChangeHook = ({ doc, req }) => {
    revalidate(targets, req);
    return doc;
  };
  const afterDelete: CollectionAfterDeleteHook = ({ doc, req }) => {
    revalidate(targets, req);
    return doc;
  };
  return { afterChange: [afterChange], afterDelete: [afterDelete] };
};

export const globalRevalidate = (...targets: RevalidateTarget[]) => {
  const afterChange: GlobalAfterChangeHook = ({ doc, req }) => {
    revalidate(targets, req);
    return doc;
  };
  return { afterChange: [afterChange] };
};
