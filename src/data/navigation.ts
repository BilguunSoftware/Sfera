export type NavItem = {
  id: string;
  label: string;
  href: string;
};

export const headerNav: NavItem[] = [
  { id: "overview", label: "НҮҮР", href: "#overview" },
  { id: "dna", label: "БИДНИЙ ТУХАЙ", href: "#dna" },
  { id: "capabilities", label: "ҮЙЛЧИЛГЭЭ", href: "#capabilities" },
  { id: "culture", label: "СОЁЛ", href: "#culture" },
];

export const footerNav: NavItem[] = [
  { id: "overview", label: "Нүүр", href: "#overview" },
  { id: "dna", label: "Бидний тухай", href: "#dna" },
  { id: "capabilities", label: "Үйлчилгээ", href: "#capabilities" },
  { id: "contact", label: "Холбогдох", href: "#contact" },
];
