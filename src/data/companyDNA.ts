export type DnaSymbol = "orbit" | "axis" | "plus";

export type CompanyDnaItem = {
  id: string;
  number: string;
  label: string;
  englishLabel: string;
  title: string;
  description: string;
  symbol: DnaSymbol;
};

export const companyDNA: CompanyDnaItem[] = [
  {
    id: "purpose",
    number: "01",
    label: "ЗОРИЛГО",
    englishLabel: "OUR PURPOSE",
    title: "Утга учиртай\nахиц дэвшил.",
    description:
      "Бид ажил бүрийг богино хугацааны шийдэл биш, урт хугацааны үнэ цэнэ бүтээх боломж гэж хардаг.",
    symbol: "orbit",
  },
  {
    id: "approach",
    number: "02",
    label: "ХАНДЛАГА",
    englishLabel: "OUR APPROACH",
    title: "Нээлттэй сэтгэж.\nТодорхой ажиллана.",
    description:
      "Бие биенээ сонсож, боломжийг хамтдаа тодорхойлоод, хэрэгжүүлэх алхам бүрээ ойлгомжтой байлгана.",
    symbol: "axis",
  },
  {
    id: "values",
    number: "03",
    label: "ҮНЭТ ЗҮЙЛ",
    englishLabel: "OUR VALUES",
    title: "Итгэлцэл.\nХариуцлага. Чанар.",
    description:
      "Хамтын ажиллагаа, хариуцлагатай шийдвэр, тууштай сайжруулалтыг бидний суурь зарчим гэж үздэг.",
    symbol: "plus",
  },
];
