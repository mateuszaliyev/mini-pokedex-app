import * as z from "zod";

import { client } from "@/api/client";
import {
  pokemonIdQuery,
  pokemonListQuery,
  pokemonNameQuery,
  type PokemonNameQueryReturnType,
} from "@/api/queries";

import { MAX_ITEMS_PER_PAGE } from "@/configuration";

import { isNotNull } from "@/utilities/boolean";

export type Pokemon = ReturnType<
  typeof parsePokemon<PokemonNameQueryReturnType["pokemon"][number]>
>;

const pokemonSprites = z.object({
  other: z
    .object({
      "official-artwork": z
        .object({
          /**
           * Official artworks are 475px x 475px by default.
           */
          front_default: z
            .url()
            .transform((url) => ({ height: 475, url, width: 475 })),
        })
        /**
         * Convert snake_case to camelCase for consistency.
         */
        .transform(({ front_default: frontDefault, ...officialArtwork }) => ({
          ...officialArtwork,
          frontDefault,
        })),
    })
    /**
     * Convert kebab-case to camelCase for consistency.
     */
    .transform(({ "official-artwork": officialArtwork, ...other }) => ({
      ...other,
      officialArtwork,
    })),
});

const parsePokemon = <
  TPokemon extends Pick<
    PokemonNameQueryReturnType["pokemon"][number],
    "sprites" | "types"
  >,
>({
  sprites,
  types,
  ...pokemon
}: TPokemon) => {
  const result = pokemonSprites.safeParse(sprites[0].sprites);

  return {
    ...pokemon,
    sprites: result.data,
    types: types.map(({ type }) => type).filter(isNotNull),
  };
};

export const pokemon = {
  get: ({
    limit = MAX_ITEMS_PER_PAGE,
    offset,
  }: { limit?: number; offset?: number } = {}) =>
    client
      .request(pokemonListQuery, { limit, offset })
      .then(({ pokemon, pokemonAggregate: { aggregate } }) => ({
        count: aggregate?.count,
        pages: aggregate
          ? Math.ceil(aggregate.count / MAX_ITEMS_PER_PAGE)
          : undefined,
        pokemon: pokemon.map(parsePokemon),
      })),

  getPage: (page?: number) =>
    pokemon.get(page ? { offset: MAX_ITEMS_PER_PAGE * (page - 1) } : undefined),

  getById: (id: number) =>
    client
      .request(pokemonIdQuery, { id })
      .then((data) => data.pokemon.map(parsePokemon)),

  getByName: (name: string) =>
    client
      .request(pokemonNameQuery, { name })
      .then((data) => data.pokemon.map(parsePokemon)),

  getByQuery: (query: string) => {
    const id = parseInt(query);

    const promise = Number.isNaN(id)
      ? pokemon.getByName(query.toLowerCase().replaceAll(/[^0-9A-Za-z]/g, "-"))
      : pokemon.getById(id);

    return promise;
  },
};
