import { FORMAT_LOCALE } from "@/configuration";

const conjunctionFormat = new Intl.ListFormat(FORMAT_LOCALE, {
  style: "narrow",
  type: "conjunction",
});

export const formatConjunction = (
  list: Parameters<(typeof conjunctionFormat)["format"]>[0],
) => conjunctionFormat.format(list);

export const kebabCaseToSentenceCase = (
  string: string,
  { capitalize = false }: { capitalize?: boolean } = {},
) => {
  const words = string.split("-");

  return words
    .map((word, index) => {
      if (!capitalize && index) return word;
      return word[0].toUpperCase() + word.slice(1);
    })
    .join(" ");
};
