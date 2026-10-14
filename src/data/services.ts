export type Service = {
  id: string;
  number: string;
  title: string;
  description: string;
  englishLabel: string;
  image: string;
  imageAlt: string;
  imagePosition: string;
};

export const services: Service[] = [
  {
    id: "consulting",
    number: "01",
    title: "ЗӨВЛӨХ & ТӨЛӨВЛӨХ",
    description:
      "Зорилго, хэрэгцээ, боломжийг тодорхойлж, ажил хэрэг болгох ойлгомжтой төлөвлөгөө боловсруулна.",
    englishLabel: "STRATEGY / CONSULTING",
    image: "/images/workspace/studio-desk.jpg",
    imageAlt: "Цэвэрхэн ажлын ширээ бүхий оффисын загвар зураг. Бодит байрыг харуулаагүй.",
    imagePosition: "center",
  },
  {
    id: "solutions",
    number: "02",
    title: "ШИЙДЭЛ БОЛОВСРУУЛАХ",
    description:
      "Тухайн нөхцөл байдалд тохирсон арга зам, үйлчилгээ, зохион байгуулалтын шийдлийг боловсруулна.",
    englishLabel: "SOLUTIONS / DEVELOPMENT",
    image: "/images/workspace/solutions.jpg",
    imageAlt: "Гэрэлтэй архитектурын ажлын орчны загвар зураг. Бодит байрыг харуулаагүй.",
    imagePosition: "center 40%",
  },
  {
    id: "delivery",
    number: "03",
    title: "ТӨСӨЛ ХЭРЭГЖҮҮЛЭХ",
    description:
      "Төлөвлөсөн ажлыг үе шаттай хэрэгжүүлж, үр дүнг хянаж, тасралтгүй сайжруулна.",
    englishLabel: "DELIVERY / OPERATIONS",
    image: "/images/culture/collaboration.jpg",
    imageAlt: "Хамтран ажиллаж буй хүмүүсийн загвар зураг. Бодит багийг харуулаагүй.",
    imagePosition: "center 30%",
  },
];
