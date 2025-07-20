import { data } from "react-router";

import { api } from "@/api";

import { Badge, Badges } from "@/components/badge";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import {
  DescriptionDetails,
  DescriptionList,
  DescriptionListItem,
  DescriptionTerm,
} from "@/components/description-list";
import { ArrowIcon } from "@/components/icons/arrow";
import { Image } from "@/components/image";
import { LinkBack } from "@/components/link";
import { Meter } from "@/components/meter";
import { Heading, Kicker } from "@/components/typography";

import {
  formatNationalPokedexNumber,
  formatPokemonHeight,
  formatPokemonStatistic,
  formatPokemonWeight,
  getPokemonStatisticRanges,
  isPokemonStatistic,
} from "@/utilities/pokemon";
import { formatConjunction, kebabCaseToSentenceCase } from "@/utilities/string";

import type { Route } from "./+types/pokemon";

export const loader = async ({ params }: Route.LoaderArgs) => {
  const [pokemon] = await api.pokemon.getByName(params.name);

  if (!pokemon) throw data({}, { status: 404 });

  return { pokemon };
};

const PokemonPage = ({ loaderData: { pokemon } }: Route.ComponentProps) => {
  const sprite = pokemon.sprites?.other.officialArtwork.frontDefault;

  return (
    <>
      <title>{pokemon.name}</title>
      <header>
        <Container>
          <div className="flex h-24 items-center">
            <Button asChild size="icon" variant="secondary">
              <LinkBack>
                <ArrowIcon className="-rotate-90" />
                <span className="sr-only">Back</span>
              </LinkBack>
            </Button>
          </div>
          <Kicker>{formatNationalPokedexNumber(pokemon.id)}</Kicker>
          <Heading as="h1" level={1}>
            {kebabCaseToSentenceCase(pokemon.name, { capitalize: true })}
          </Heading>
          <Badges className="mt-3">
            {pokemon.types.map((type) => (
              <Badge asChild className="capitalize" key={type.id}>
                <li>{type.name}</li>
              </Badge>
            ))}
          </Badges>
        </Container>
      </header>
      <main
        className="pt-48 pb-24 transition-all duration-500 sm:pt-12"
        data-background="gray"
      >
        <Container className="relative rounded-3xl bg-white py-6">
          {sprite && (
            <Image
              alt={pokemon.name}
              className="absolute top-0 left-1/2 size-64 -translate-x-1/2 -translate-y-4/5 transition-all duration-500 sm:left-3/4 sm:-translate-y-2/3"
              height={sprite.height}
              priority
              src={sprite.url}
              width={sprite.width}
            />
          )}
          <section>
            <Heading level={3}>About</Heading>
            <DescriptionList className="mt-2">
              {typeof pokemon.height === "number" && pokemon.height > 0 && (
                <DescriptionListItem>
                  <DescriptionTerm>Height</DescriptionTerm>
                  <DescriptionDetails>
                    {formatPokemonHeight(pokemon.height)}
                  </DescriptionDetails>
                </DescriptionListItem>
              )}
              {typeof pokemon.weight === "number" && pokemon.weight > 0 && (
                <DescriptionListItem>
                  <DescriptionTerm>Weight</DescriptionTerm>
                  <DescriptionDetails>
                    {formatPokemonWeight(pokemon.weight)}
                  </DescriptionDetails>
                </DescriptionListItem>
              )}
              <DescriptionListItem>
                <DescriptionTerm>Abilities</DescriptionTerm>
                <DescriptionDetails>
                  {formatConjunction(
                    pokemon.abilities
                      .map(({ ability }) =>
                        ability
                          ? kebabCaseToSentenceCase(ability.name)
                          : undefined,
                      )
                      .filter((ability) => typeof ability === "string"),
                  )}
                </DescriptionDetails>
              </DescriptionListItem>
            </DescriptionList>
          </section>
          <section className="mt-6">
            <Heading level={3}>Base stats</Heading>
            <DescriptionList className="mt-2">
              {pokemon.statistics.map(({ base, statistic }) => {
                if (!isPokemonStatistic(statistic?.name)) return null;

                const range = getPokemonStatisticRanges(statistic.name);

                return (
                  <DescriptionListItem>
                    <DescriptionTerm>
                      {formatPokemonStatistic(statistic.name)}
                    </DescriptionTerm>
                    <DescriptionDetails className="flex items-center gap-4">
                      <span className="min-w-[3ch] text-end">{base}</span>
                      <Meter
                        max={range.max}
                        min={range.min}
                        text={`${base}`}
                        value={base}
                      />
                    </DescriptionDetails>
                  </DescriptionListItem>
                );
              })}
            </DescriptionList>
          </section>
        </Container>
      </main>
    </>
  );
};

export default PokemonPage;
