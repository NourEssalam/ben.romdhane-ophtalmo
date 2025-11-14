import { Eye, Microscope, Zap } from "lucide-react";

interface Treatment {
  name: string;
  desc: string;
}

interface Intervention {
  name: string;
  desc: string;
}

interface SubCategory {
  name: string;
  image: string;
  description: string;
  equipment?: string[];
  applications?: string[];
  conditions?: string[];
  treatments?: Treatment[];
  interventions?: Intervention[];
}

interface MainCategory {
  title: string;
  icon: any;
  color: string;
  subcategories: {
    [key: string]: SubCategory;
  };
}

interface ServicesData {
  [key: string]: MainCategory;
}

export const servicesData: ServicesData = {
  examens: {
    title: "Examens Réalisés",
    icon: Eye,
    color: "brand",
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
    icon: Microscope,
    color: "brand",
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
    icon: Zap,
    color: "brand",
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
