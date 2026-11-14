import type { Access } from "payload";

/** Public read for all site content. */
export const anyone: Access = () => true;

/** Writes restricted to logged-in admin users. */
export const authenticated: Access = ({ req: { user } }) => Boolean(user);
