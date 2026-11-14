/**
 * Seed Payload with the site's current hardcoded content and images.
 *
 * Run: pnpm seed   (= payload run scripts/seed.ts)
 *
 * Idempotent: media matched on filename, service categories on slug,
 * testimonials on name; globals are overwritten. Safe to rerun, e.g. against
 * production. Deletes nothing.
 *
 * Images come from scripts/seed-media/. With BLOB_READ_WRITE_TOKEN set they go
 * to that Blob store; a media doc whose file is missing from the current store
 * (e.g. dev rows created before Blob) is re-uploaded.
 */
import path from "path";
import fs from "fs";
import { getPayload } from "payload";
import type { Payload } from "payload";
import config from "@payload-config";

import type { ServiceCategory } from "../payload-types";

const SEED_MEDIA_DIR = path.resolve(process.cwd(), "scripts/seed-media");

type Stat = { created: number; updated: number; reuploaded: number };
const stats: Record<string, Stat> = {};
const notMapped: string[] = [];
const bump = (key: string, kind: keyof Stat) => {
  stats[key] ??= { created: 0, updated: 0, reuploaded: 0 };
  stats[key][kind]++;
};

/* ------------------------------------------------------------------ */
/* Content copied verbatim from non-exported constants / JSX.          */
/* ------------------------------------------------------------------ */

// Former lib/servicesData.ts (deleted in Phase 7; the frontend now reads Payload).
type SubCategoryFixture = {
  name: string;
  image: string;
  description: string;
  equipment?: string[];
  applications?: string[];
  conditions?: string[];
  treatments?: { name: string; desc: string }[];
  interventions?: { name: string; desc: string }[];
};
const servicesData: Record<
  string,
  { title: string; subcategories: Record<string, SubCategoryFixture> }
> = {
  examens: {
    title: "Examens Réalisés",
    subcategories: {
      acuite: {
        name: "Acuité Visuelle",
        image: "/exa1.jpg",
        description:
          "Évaluation complète de votre capacité visuelle avec des équipements de précision",
        equipment: [
          "Auto-réfractomètre Canon",
          "Réfracteur automatique Nidek",
          "Projecteur de tests Nidek",
          "Frontofocomètre Oculus",
          "Ophtalmomètre de Javal (Haag-Streit)",
          "Boîte de verres d'essai complète",
          "Montures d'essai",
          "Échelles visuelles Monoyer, Snellen, Pigassou",
          "Tests optométriques Parinaud",
        ],
      },
      couleurs: {
        name: "Vision des Couleurs",
        image: "/exa2.jpg",
        description: "Dépistage des troubles de perception chromatique",
        equipment: ["Test d'Ishihara"],
      },
      globes: {
        name: "Globes Oculaires",
        image: "/exa3.jpg",
        description:
          "Exploration approfondie des structures oculaires et dépistage des pathologies",
        equipment: [
          "Table élévatrice coulissante Haag Streit",
          "Biomicroscope 900BQ Haag Streit (LAF)",
          "Ophtalmoscope direct pour fond d'œil",
          "Tonomètre - Mesure de la tension oculaire(Glaucome)",
        ],
        applications: [
          "Exploration segment antérieur de l'œil",
          "Examen de la conjunctive",
          "Examen de la cornée et du cristallin",
          "Examen de la rétine et du nerf optique",
          "Exploration des vaisseaux rétiniens",
          "Maladies de la choroïde et papilles optiques",
          "Diagnostic du glaucome",
        ],
      },
    },
  },
  pathologies: {
    title: "Pathologies & Traitements",
    subcategories: {
      refraction: {
        name: "Anomalies de Réfraction",
        image: "/landscape_img/ls1.jpg",
        description: "Correction des défauts visuels pour une vision optimale",
        conditions: ["Myopie", "Hypermétropie", "Astigmatisme", "Presbytie"],
        treatments: [
          { name: "Lunettes", desc: "Correction optique sur mesure" },
          {
            name: "Lentilles de contact",
            desc: "Solution discrète et confortable",
          },
          {
            name: "Chirurgie LASIK",
            desc: "Correction définitive au laser excimer",
          },
        ],
      },
      maladies: {
        name: "Maladies des Yeux",
        image: "/eys-deases.jpg",
        description:
          "Prise en charge des affections médicales pouvant affecter votre vision",
        conditions: [
          "Strabismes et hétérophories",
          "Inflammations oculaires",
          "Infections oculaires",
          "Troubles du tonus oculaire (glaucomes)",
          "Rétinopathie diabétique",
          "Rétinopathie hypertensive",
          "Cataracte (atteintes séniles)",
          "Dégénérescence maculaire (DMLA)",
        ],
        treatments: [
          {
            name: "Traitement Médical",
            desc: "Collyres, médicaments systémiques",
          },
          { name: "Traitement Laser", desc: "Photocoagulation, laser ARGON" },
          {
            name: "Traitement Chirurgical",
            desc: "Interventions spécialisées",
          },
        ],
      },
    },
  },
  chirurgie: {
    title: "Interventions Chirurgicales",
    subcategories: {
      principales: {
        name: "Chirurgies Principales",
        image: "/landscape_img/ls2.jpg",
        description:
          "Interventions chirurgicales pour restaurer et préserver votre vision",
        interventions: [
          { name: "Cataracte", desc: "Remplacement du cristallin opacifié" },
          { name: "Glaucome", desc: "Réduction de la pression intraoculaire" },
          { name: "Strabisme", desc: "Correction de l'alignement oculaire" },
          { name: "LASIK", desc: "Chirurgie réfractive au laser excimer" },
        ],
      },
      annexes: {
        name: "Chirurgie des Annexes",
        image: "/surgery.jpg",
        description: "Interventions sur les structures externes de l'œil",
        interventions: [
          { name: "Chalazion", desc: "Excision de kyste palpébral" },
          {
            name: "Ptérygion",
            desc: "Retrait de tissu conjonctival envahissant",
          },
        ],
      },
    },
  },
};

// components/Hero.tsx (slides array + JSX text)
const heroSlides = [
  { file: "landscape_img/ls1.jpg", caption: "Votre vision, notre priorité" },
  { file: "landscape_img/ls2.jpg", caption: "Examens complets et soins modernes" },
  { file: "landscape_img/ls3.jpg", caption: "Technologies de pointe en ophtalmologie" },
];
const hero = {
  heading: "Une Bonne Vision Pour Votre Bien-Être",
  intro:
    "Notre cabinet d’ophtalmologie propose des examens complets, des traitements adaptés et un suivi personnalisé pour préserver votre santé visuelle.",
  primaryCtaLabel: "Découvrir nos services",
  secondaryCtaLabel: "Contact",
};

// components/Services.tsx (serviceCards) + subtitle <p> of each app/(frontend)/services/*/page.tsx
const categoryMeta = [
  {
    slug: "examens",
    dataKey: "examens",
    icon: "eye",
    subtitle: "Équipements de pointe pour un diagnostic précis",
    card: {
      description: "Équipements de pointe pour un diagnostic précis de votre vision",
      image: "examens1.jpg",
      features: ["Acuité visuelle", "Vision des couleurs", "Exploration des globes oculaires"],
    },
  },
  {
    slug: "pathologies",
    dataKey: "pathologies",
    icon: "microscope",
    subtitle: "Prise en charge complète des pathologies oculaires",
    card: {
      description: "Prise en charge complète des pathologies oculaires",
      image: "Pathologies.jpg",
      features: ["Anomalies de réfraction", "Maladies des yeux", "Traitements adaptés"],
    },
  },
  {
    slug: "interventions",
    dataKey: "chirurgie",
    icon: "zap",
    subtitle: "Interventions chirurgicales de pointe pour votre vision",
    card: {
      description: "Chirurgies modernes pour restaurer votre vision",
      image: "landscape_img/ls2.jpg",
      features: ["Cataracte", "Glaucome", "Chirurgie réfractive"],
    },
  },
] as const;

// components/Testimonials.tsx (reviews)
const testimonials = [
  { name: "Aymen", text: "Accueil chaleureux et examen très complet. Je recommande vivement !" },
  { name: "Nadia", text: "Très professionnelle, explications claires et rassurantes." },
  { name: "أمينة", text: "استقبال ممتاز وفحص شامل. أنصح به بشدة.", dir: "rtl" },
  { name: "بلال", text: "طبيب محترف وتوضيحات دقيقة ومطمئنة.", dir: "rtl" },
  // SAMPLE: placeholder reviews, replace with real ones before launch.
  { name: "Sami", text: "Rendez-vous rapide et médecin à l’écoute. Examen minutieux et conseils utiles." },
  { name: "سلمى", text: "طبيب لطيف وصبور، شرح لي كل شيء بوضوح.", dir: "rtl" },
] as const;

// components/Biography.tsx (JSX text)
const biography = {
  photo: "docteur.jpg",
  badge: "En exercice depuis 1990",
  headline: "Médecin Spécialiste en Ophtalmologie",
  headlineSubtitle: "Formation internationale et expérience hospitalière",
  education: {
    institution: "Université Pierre et Marie Curie (Paris VI)",
    diploma: "Diplôme en Ophtalmologie",
  },
  experience: {
    title: "Parcours Professionnel",
    items: [
      "Médecin ophtalmologue au centre universitaire Tahar Sfar à Mahdia",
      "Cabinet libéral en ophtalmologie à Ksar-Hellal (jusqu’en 2018)",
      "Cabinet d’ophtalmologie à Mahdia - Complexe médical EMNA, avenue 02 mars 1934",
    ],
  },
  diplomas: {
    title: "Diplômes Complémentaires",
    institution: "Université René Descartes (Paris V)",
    items: [
      "Médecine aéronautique (Faculté des Saints Pères)",
      "Pédiatrie préventive",
      "Pédiatrie et puériculture",
    ],
  },
};

// components/ContactFooter.tsx (JSX text)
const contact = {
  intro:
    "N’hésitez pas à nous contacter pour une consultation ou toute information complémentaire.",
  address: "Complexe medical EMNA, Avenue 02 mars 1934, 5100 MAHDIA(Tunisie)",
  landmark: "70m à droite de la CNSS, au dissus de magazin AZIZA et près de CARREFOUR",
  phones: [
    { display: "73 681 081", number: "73681081" },
    { display: "50 455 700", number: "50455700" },
  ],
  email: "dr.benromdhanebrahim@gmail.com",
  hours: "Lun - Sam: 08:30 - 13:00",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3247.8648203743223!2d11.052349565645988!3d35.50762066766645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x130223c23bc07003%3A0x1c3850aef7b1dbc0!2sAv.%20du%202%20Mars%201934%2C%20Mahdia!5e0!3m2!1sen!2stn!4v1762465178754!5m2!1sen!2stn",
};

// app/(frontend)/layout.tsx (metadata)
const siteSettings = {
  title: "Dr Brahim Ben Romdhane | Ophtalmologiste à Mahdia",
  description:
    "Cabinet d'ophtalmologie à Mahdia: examens, traitements, chirurgie, et suivi visuel.",
};

/* ------------------------------------------------------------------ */
/* Media: one doc per seed-media file, alt from former alt attributes. */
/* ------------------------------------------------------------------ */

const mediaAlt = new Map<string, string>();
const setAlt = (file: string, alt: string) => {
  if (!mediaAlt.has(file)) mediaAlt.set(file, alt); // first content alt wins
};
// Subcategory <Image alt={sub.name}> on the services pages
for (const cat of Object.values(servicesData)) {
  for (const sub of Object.values(cat.subcategories)) {
    setAlt(sub.image.replace(/^\//, ""), sub.name);
  }
}
// Services.tsx cards: <Image alt={service.title}>
for (const meta of categoryMeta) {
  setAlt(meta.card.image, servicesData[meta.dataKey].title);
}
// Biography.tsx
setAlt(biography.photo, "Docteur Ophtalmologue");
// Hero slides are CSS backgrounds without alt: fall back to the caption.
for (const s of heroSlides) {
  if (!mediaAlt.has(s.file)) {
    setAlt(s.file, s.caption);
    notMapped.push(`${s.file}: no alt attribute in source (CSS background); alt derived from caption`);
  }
}

const mediaIds = new Map<string, number | string>();

/** Is the stored file actually reachable in the current storage (Blob or local disk)? */
async function isStored(doc: { url?: string | null; filename?: string | null }) {
  if (doc.url && /^https?:\/\//.test(doc.url)) {
    const res = await fetch(doc.url, { method: "HEAD" }).catch(() => null);
    return Boolean(res?.ok);
  }
  return Boolean(doc.filename && fs.existsSync(path.resolve(process.cwd(), "media", doc.filename)));
}

async function upsertMedia(payload: Payload, file: string, alt: string) {
  const filePath = path.join(SEED_MEDIA_DIR, file);
  if (!fs.existsSync(filePath)) {
    notMapped.push(`${file}: file missing in scripts/seed-media/`);
    return;
  }
  const filename = path.basename(file);
  const existing = await payload.find({
    collection: "media",
    where: { filename: { equals: filename } },
    limit: 1,
    depth: 0,
  });
  const current = existing.docs[0];
  if (current) {
    const reupload = !(await isStored(current));
    const doc = await payload.update({
      collection: "media",
      id: current.id,
      data: { alt },
      depth: 0,
      // Keep the same filename so later runs still match on it.
      ...(reupload ? { filePath, overwriteExistingFiles: true } : {}),
    });
    mediaIds.set(file, doc.id);
    bump("media", reupload ? "reuploaded" : "updated");
  } else {
    const doc = await payload.create({ collection: "media", data: { alt }, filePath, depth: 0 });
    mediaIds.set(file, doc.id);
    bump("media", "created");
  }
}

const media = (file: string) => {
  const id = mediaIds.get(file.replace(/^\//, ""));
  if (id === undefined) throw new Error(`Media not seeded: ${file}`);
  return id as number;
};
const list = (items?: readonly string[]) => items?.map((item) => ({ item }));

/* ------------------------------------------------------------------ */

async function seed() {
  const payload = await getPayload({ config });

  // 1. Media
  for (const [file, alt] of mediaAlt) await upsertMedia(payload, file, alt);

  // 2. Service categories (match on slug)
  for (const [i, meta] of categoryMeta.entries()) {
    const src = servicesData[meta.dataKey];
    const data: Omit<ServiceCategory, "id" | "createdAt" | "updatedAt"> = {
      slug: meta.slug,
      sortOrder: i,
      icon: meta.icon,
      title: src.title,
      subtitle: meta.subtitle,
      card: {
        description: meta.card.description,
        image: media(meta.card.image),
        features: list(meta.card.features),
      },
      subcategories: Object.entries(src.subcategories).map(([key, sub]) => ({
        key,
        name: sub.name,
        image: media(sub.image),
        description: sub.description,
        equipment: list(sub.equipment),
        applications: list(sub.applications),
        conditions: list(sub.conditions),
        treatments: sub.treatments,
        interventions: sub.interventions,
      })),
    };
    const existing = await payload.find({
      collection: "service-categories",
      where: { slug: { equals: meta.slug } },
      limit: 1,
      depth: 0,
    });
    if (existing.docs[0]) {
      await payload.update({ collection: "service-categories", id: existing.docs[0].id, data });
      bump("service-categories", "updated");
    } else {
      await payload.create({ collection: "service-categories", data });
      bump("service-categories", "created");
    }
  }
  const mappedKeys = new Set<string>(categoryMeta.map((m) => m.dataKey));
  for (const key of Object.keys(servicesData)) {
    if (!mappedKeys.has(key)) notMapped.push(`servicesData.${key}: no matching service-category slug`);
  }

  // 3. Testimonials (match on name)
  for (const [i, t] of testimonials.entries()) {
    const data = { name: t.name, text: t.text, dir: "dir" in t ? t.dir : "ltr", sortOrder: i } as const;
    const existing = await payload.find({
      collection: "testimonials",
      where: { name: { equals: t.name } },
      limit: 1,
      depth: 0,
    });
    if (existing.docs[0]) {
      await payload.update({ collection: "testimonials", id: existing.docs[0].id, data });
      bump("testimonials", "updated");
    } else {
      await payload.create({ collection: "testimonials", data });
      bump("testimonials", "created");
    }
  }

  // 4. Globals
  await payload.updateGlobal({
    slug: "hero",
    data: {
      ...hero,
      slides: heroSlides.map((s) => ({ image: media(s.file), caption: s.caption })),
    },
  });
  bump("global:hero", "updated");

  await payload.updateGlobal({
    slug: "biography",
    data: {
      photo: media(biography.photo),
      badge: biography.badge,
      headline: biography.headline,
      headlineSubtitle: biography.headlineSubtitle,
      education: biography.education,
      experience: { title: biography.experience.title, items: list(biography.experience.items) },
      diplomas: {
        title: biography.diplomas.title,
        institution: biography.diplomas.institution,
        items: list(biography.diplomas.items),
      },
    },
  });
  bump("global:biography", "updated");

  await payload.updateGlobal({ slug: "contact", data: contact });
  bump("global:contact", "updated");

  await payload.updateGlobal({ slug: "site-settings", data: siteSettings });
  bump("global:site-settings", "updated");

  // 5. Known content without a schema field (static list, checked by hand)
  notMapped.push(
    "public/logo_transparent.png (components/Logo.tsx): no logo field in schema",
    "Section headings/intros with no field: Biography 'À Propos du Docteur' + 'Longue expérience en ophtalmologie'; Services 'Nos Services Ophtalmologiques' + intro; ContactFooter 'Contact & Informations'; Testimonials heading + intro; services sidebar 'Nos Services'",
    "components/ExamensSection.tsx: not used by any page, skipped",
    "Unused public/ images not uploaded: anoRef.jpg, eyeballs.jpg, shihara.webp, Ophtalmologue-Mahdia-Dr-Brahim-Ben-Romdhane.jpeg, landscape_img/navy-medicine-Dpjx9BiTftQ-unsplash.jpg",
  );

  // Report
  console.log("\nSeed done.\n");
  console.log("Run results (created / updated / file re-uploaded):");
  for (const [key, s] of Object.entries(stats)) {
    console.log(`  ${key.padEnd(24)} ${s.created} / ${s.updated} / ${s.reuploaded}`);
  }
  console.log("\nTotals in database:");
  for (const collection of ["media", "service-categories", "testimonials"] as const) {
    const { totalDocs } = await payload.count({ collection });
    console.log(`  ${collection.padEnd(24)} ${totalDocs}`);
  }
  console.log("\nNot mapped:");
  for (const line of notMapped) console.log(`  - ${line}`);

  process.exit(0);
}

// Top-level await: `payload run` only awaits the module import, then exits.
try {
  await seed();
} catch (err) {
  console.error(err);
  process.exit(1);
}
