import { formatters } from "@/utilities/number";
import { kebabCaseToSentenceCase } from "@/utilities/string";

export type PokemonStatistic =
  (typeof PokemonStatistic)[keyof typeof PokemonStatistic];

export const PokemonStatistic = {
  Attack: "attack",
  Defense: "defense",
  Hp: "hp",
  SpecialAttack: "special-attack",
  SpecialDefense: "special-defense",
  Speed: "speed",
} as const;

export const POKEMON_STATISTIC_RANGES = {
  [PokemonStatistic.Attack]: { max: 190, min: 5 },
  [PokemonStatistic.Defense]: { max: 250, min: 5 },
  [PokemonStatistic.Hp]: { max: 255, min: 1 },
  [PokemonStatistic.SpecialAttack]: { max: 194, min: 10 },
  [PokemonStatistic.SpecialDefense]: { max: 250, min: 20 },
  [PokemonStatistic.Speed]: { max: 200, min: 5 },
} as const satisfies Record<PokemonStatistic, { max: number; min: number }>;

export const formatNationalPokedexNumber = (id: number) =>
  `#${id.toString().padStart(4, "0")}`;

export const formatPokemonHeight = (height: number) => {
  const centimeters = height * 10;
  const totalInches = centimeters / 2.54;

  let feet = Math.floor(totalInches / 12);
  let inches = Math.ceil(totalInches % 12);

  if (inches === 12) {
    feet += 1;
    inches = 0;
  }

  return `${formatters.length.centimeter.format(centimeters)} (${formatters.length.foot.format(feet)} ${formatters.length.inch.format(inches)})`;
};

export const formatPokemonStatistic = (statistic: PokemonStatistic) =>
  statistic === PokemonStatistic.Hp
    ? statistic.toUpperCase()
    : kebabCaseToSentenceCase(statistic);

export const formatPokemonWeight = (weight: number) => {
  const kilograms = weight / 10;
  const pounds = kilograms * 2.20462;
  return `${formatters.mass.kilogram.format(kilograms)} (${formatters.mass.pound.format(pounds)})`;
};

export const getPokemonStatisticRanges = (statistic: PokemonStatistic) =>
  POKEMON_STATISTIC_RANGES[statistic];

export const isPokemonStatistic = (
  statistic: unknown,
): statistic is PokemonStatistic =>
  typeof statistic === "string" && statistic in POKEMON_STATISTIC_RANGES;
