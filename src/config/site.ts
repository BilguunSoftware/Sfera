export type SocialLink = {
  label: string;
  href: string;
};

export type CollaborationOption = {
  value: string;
  label: string;
};

export type SiteConfig = {
  companyName: string;
  tagline: string;
  logoText: string;
  logoMark: string;
  monogram: string;
  profileLabel: string;
  profileIndex: string;
  year: string;
  description: string;
  industry: string;
  phone: string;
  email: string;
  address: string;
  siteUrl: string;
  headerEyebrow: string;
  talkLabel: string;
  canvasMotto: string;
  socialLinks: SocialLink[];
  studio: {
    name: string;
    url: string;
  };
  contactSettings: {
    formspreeEndpoint: string;
    mailtoSubject: string;
    collaborationOptions: CollaborationOption[];
  };
  seo: {
    title: string;
    description: string;
    locale: string;
    keywords: string[];
  };
};

export const siteConfig: SiteConfig = {
  companyName: "SFERA",
  tagline: "A Company in Motion",
  logoText: "SFERA",
  logoMark: "✳",
  monogram: "S",
  profileLabel: "COMPANY PROFILE",
  profileIndex: "001",
  year: "2026",
  description:
    "Хүмүүс, санаа, хамтын ажиллагаанд тулгуурласан орчин үеийн компанийн танилцуулга.",
  industry: "Professional services",
  phone: "",
  email: "",
  address: "",
  siteUrl: "",
  headerEyebrow: "INDEPENDENT COMPANY PROFILE",
  talkLabel: "LET'S TALK",
  canvasMotto: "WE MOVE FORWARD WITH PURPOSE.",
  socialLinks: [],
  studio: {
    name: "BilguunSoft",
    url: "",
  },
  contactSettings: {
    formspreeEndpoint: "",
    mailtoSubject: "",
    collaborationOptions: [
      { value: "consulting", label: "Зөвлөх үйлчилгээ" },
      { value: "solutions", label: "Шийдэл боловсруулах" },
      { value: "delivery", label: "Төсөл хэрэгжүүлэх" },
      { value: "partnership", label: "Хамтын ажиллагаа" },
      { value: "other", label: "Бусад" },
    ],
  },
  seo: {
    title: "SFERA — A Company in Motion",
    description:
      "SFERA компанийн танилцуулга. Хүмүүс, санаа, хамтын ажиллагаагаар утга учиртай ахиц бүтээнэ.",
    locale: "mn_MN",
    keywords: ["SFERA", "компани", "зөвлөх үйлчилгээ", "хамтын ажиллагаа", "company profile"],
  },
};

export type ContactMode = "formspree" | "mailto" | "demo";

export function getContactMode(config: SiteConfig = siteConfig): ContactMode {
  if (config.contactSettings.formspreeEndpoint.trim()) return "formspree";
  if (config.email.trim()) return "mailto";
  return "demo";
}

export function getMailSubject(config: SiteConfig = siteConfig) {
  const custom = config.contactSettings.mailtoSubject.trim();
  if (custom) return custom;
  return `${config.companyName} — Хамтын ажиллагааны хүсэлт`;
}
