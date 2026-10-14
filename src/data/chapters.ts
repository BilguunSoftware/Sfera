export type Chapter = {
  id: string;
  number: string;
  canvas: {
    label: string;
    lines: string[];
    accentWords: string[];
    description: string;
  };
};

export const chapters: Chapter[] = [
  {
    id: "overview",
    number: "00",
    canvas: {
      label: "00 / OVERVIEW",
      lines: ["ИРЭЭДҮЙГ", "ХАМТДАА", "БҮТЭЭНЭ."],
      accentWords: ["БҮТЭЭНЭ."],
      description: "Хүмүүс. Санаа. Хамтын ажиллагаа.\nБиднийг тодорхойлох зүйлс.",
    },
  },
  {
    id: "dna",
    number: "01",
    canvas: {
      label: "01 / COMPANY DNA",
      lines: ["УТГА", "УЧИРТАЙ", "ӨСӨЛТ."],
      accentWords: ["ӨСӨЛТ."],
      description: "Бидний зорилго, хандлага, үнэт зүйл.",
    },
  },
  {
    id: "capabilities",
    number: "02",
    canvas: {
      label: "02 / CAPABILITIES",
      lines: ["САНААГ", "ШИЙДЭЛ", "БОЛГОНО."],
      accentWords: ["ШИЙДЭЛ"],
      description: "Асуудлыг ойлгож, бодит арга зам бүтээнэ.",
    },
  },
  {
    id: "culture",
    number: "03",
    canvas: {
      label: "03 / PEOPLE",
      lines: ["ХҮМҮҮС", "БИДНИЙ", "ХҮЧ."],
      accentWords: ["ХҮЧ."],
      description: "Сайн үр дүн хамтын ажиллагаанаас эхэлдэг.",
    },
  },
  {
    id: "approach",
    number: "04",
    canvas: {
      label: "04 / APPROACH",
      lines: ["БОДОЖ.", "ТӨЛӨВЛӨЖ.", "ХИЙНЭ."],
      accentWords: ["ХИЙНЭ."],
      description: "Тодорхой алхам. Утга учиртай үр дүн.",
    },
  },
  {
    id: "contact",
    number: "05",
    canvas: {
      label: "05 / CONTACT",
      lines: ["ХАМТДАА", "УРАГШ", "АЛХЪЯ."],
      accentWords: ["АЛХЪЯ."],
      description: "Дараагийн санаа эндээс эхэлнэ.",
    },
  },
];

export const chapterIdList = chapters.map((chapter) => chapter.id);

export const CHAPTER_TOTAL = String(chapters.length - 1).padStart(2, "0");

export function getChapter(id: string) {
  return chapters.find((chapter) => chapter.id === id) ?? chapters[0];
}
