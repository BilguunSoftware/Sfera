export type ProcessStep = {
  id: string;
  number: string;
  title: string;
  label: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    id: "listen",
    number: "01",
    title: "СОНСОХ",
    label: "STEP 01 / LISTEN",
    description:
      "Аливаа ажлыг шийдлээс бус, зөв асуултаас эхлүүлнэ. Хэрэгцээ, нөхцөл байдал, зорилгыг анхааралтай сонсоно.",
  },
  {
    id: "define",
    number: "02",
    title: "ТОДОРХОЙЛОХ",
    label: "STEP 02 / DEFINE",
    description:
      "Боломж, нөөц, эрсдэл болон хүссэн үр дүнг тодорхойлоод хэрэгжүүлэх бодит төлөвлөгөө боловсруулна.",
  },
  {
    id: "deliver",
    number: "03",
    title: "ХЭРЭГЖҮҮЛЭХ",
    label: "STEP 03 / DELIVER",
    description:
      "Төлөвлөгөөг үе шаттай хэрэгжүүлж, хамтын ажиллагаа болон тасралтгүй сайжруулалтаар үр дүнд хүрнэ.",
  },
];
