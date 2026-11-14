import { Eye, Microscope, Zap } from "lucide-react";
import type { ServiceCategory } from "../payload-types";

/** Lucide icon for each ServiceCategories `icon` select value. */
export const categoryIcons = {
  eye: Eye,
  microscope: Microscope,
  zap: Zap,
} satisfies Record<ServiceCategory["icon"], unknown>;

/** Plain, serializable link data for client components. */
export type ServiceLink = {
  slug: ServiceCategory["slug"];
  href: string;
  label: string;
  icon: ServiceCategory["icon"];
};
