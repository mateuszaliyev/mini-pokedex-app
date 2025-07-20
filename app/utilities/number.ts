import { FORMAT_LOCALE } from "@/configuration";

interface CreateUnitFormatterOptions extends Intl.NumberFormatOptions {
  locale?: Intl.LocalesArgument;
}

const createUnitFormatter = ({
  locale = FORMAT_LOCALE,
  style = "unit",
  unitDisplay = "short",
  ...options
}: CreateUnitFormatterOptions) =>
  new Intl.NumberFormat(locale, { ...options, style, unitDisplay });

export const formatters = {
  length: {
    centimeter: createUnitFormatter({ unit: "centimeter" }),
    foot: createUnitFormatter({ unit: "foot" }),
    inch: createUnitFormatter({ unit: "inch" }),
  },
  mass: {
    kilogram: createUnitFormatter({ unit: "kilogram" }),
    pound: createUnitFormatter({ maximumFractionDigits: 1, unit: "pound" }),
  },
};
