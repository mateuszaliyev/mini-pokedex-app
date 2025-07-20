import { graphql } from "gql.tada";

export type PokemonNameQueryReturnType = ReturnType<
  NonNullable<typeof pokemonNameQuery.__apiType>
>;

export const pokemonIdQuery = graphql(`
  query pokemonId($id: Int) {
    pokemon(where: { id: { _eq: $id } }) {
      id
      name
      sprites: pokemonsprites {
        sprites
      }
      types: pokemontypes {
        type {
          id
          name
        }
      }
    }
  }
`);

export const pokemonListQuery = graphql(`
  query pokemonList($limit: Int, $offset: Int) {
    pokemon(limit: $limit, offset: $offset) {
      id
      name
      sprites: pokemonsprites {
        sprites
      }
      types: pokemontypes {
        type {
          id
          name
        }
      }
    }
    pokemonAggregate: pokemon_aggregate {
      aggregate {
        count
      }
    }
  }
`);

export const pokemonNameQuery = graphql(`
  query pokemonName($name: String) {
    pokemon(where: { name: { _eq: $name } }) {
      abilities: pokemonabilities {
        ability {
          name
        }
      }
      height
      id
      name
      sprites: pokemonsprites {
        sprites
      }
      statistics: pokemonstats {
        base: base_stat
        statistic: stat {
          name
        }
      }
      types: pokemontypes {
        type {
          id
          name
        }
      }
      weight
    }
  }
`);
