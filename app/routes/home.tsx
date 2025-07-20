import { Form } from "react-router";

import * as z from "zod";

import { api } from "@/api";

import { Container } from "@/components/container";
import { PokeballIcon } from "@/components/icons/pokeball";
import { Input, Search } from "@/components/input";
import { Pagination } from "@/components/pagination";
import { FormActionNavigationPending } from "@/components/pending";
import { PokemonCard, PokemonCardSkeleton } from "@/components/pokemon";
import { Heading } from "@/components/typography";

import { MAX_ITEMS_PER_PAGE } from "@/configuration";

import { nullishToUndefined } from "@/utilities/schema";

import type { Route } from "./+types/home";

const loaderSearchParamsSchema = z.object({
  page: nullishToUndefined(z.coerce.number().int().min(2)),
  query: nullishToUndefined(z.string().min(3).toLowerCase()),
});

export const loader = async ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("query") ?? undefined;

  const searchParams = loaderSearchParamsSchema.safeParse({
    page: url.searchParams.get("page"),
    query,
  });

  if (!searchParams.data?.query) {
    const data = await api.pokemon.getPage(searchParams.data?.page);
    return { ...data, page: searchParams.data?.page ?? 1 };
  }

  const pokemon = await api.pokemon.getByQuery(searchParams.data.query);

  return {
    count: undefined,
    page: searchParams.data.page ?? 1,
    pages: undefined,
    pokemon,
    query,
  };
};

const Home = ({ loaderData }: Route.ComponentProps) => (
  <>
    <title>Mini Pokédex App</title>
    <meta content="Welcome to Mini Pokédex App!" name="description" />
    <Container className="absolute inset-0 z-[-1] overflow-hidden">
      <PokeballIcon className="pointer-events-none w-full -translate-y-1/2 mask-b-from-50% mask-b-to-90% text-gray-100 sm:mask-b-to-70%" />
    </Container>
    <header className="pt-24">
      <Container>
        <Heading as="h1" level={1}>
          Mini Pokédex App
        </Heading>
        <p className="mt-3 max-w-md leading-tight text-balance">
          Search for Pokémon by name or using the National Pokédex number.
        </p>
        <Form className="mt-6" method="GET">
          <Search>
            <Input
              defaultValue={loaderData.query}
              name="query"
              placeholder="What Pokémon are you looking for?"
              type="search"
            />
          </Search>
        </Form>
      </Container>
    </header>
    <main className="pb-24">
      <Container>
        {loaderData.pokemon.length > 0 ? (
          <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <FormActionNavigationPending
              fallback={Array.from(
                { length: MAX_ITEMS_PER_PAGE / 2 },
                (_, index) => (
                  <li className="contents" key={index}>
                    <PokemonCardSkeleton />
                  </li>
                ),
              )}
            >
              {loaderData.pokemon.map((pokemon, index) => (
                <li className="contents" key={pokemon.id}>
                  <PokemonCard pokemon={pokemon} priority={index < 2} />
                </li>
              ))}
            </FormActionNavigationPending>
          </ul>
        ) : (
          <>
            <Heading className="mt-12">No Pokémon found!</Heading>
            <p className="mt-3 max-w-md leading-tight text-balance">
              We couldn&apos;t find any Pokémon matching your search. This could
              be for a few reasons:
            </p>
            <ul className="mt-6 divide-y divide-gray-200 border-y border-gray-200 text-sm">
              <li className="py-4">
                <Heading as="h3" level="none">
                  Typos
                </Heading>
                <p className="mt-1 max-w-md leading-tight text-balance">
                  Double-check your spelling! Even a small typo can prevent us
                  from finding what you're looking for.
                </p>
              </li>
              <li className="py-4">
                <Heading as="h3" level="none">
                  Partial names
                </Heading>
                <p className="mt-1 max-w-md leading-tight text-balance">
                  We can only search for exact names or National Pokédex
                  numbers. Try typing the full name of the Pokémon.
                </p>
              </li>
              <li className="py-4">
                <Heading as="h3" level="none">
                  Pokédex number out of range
                </Heading>
                <p className="mt-1 max-w-md leading-tight text-balance">
                  If you searched by number, make sure it&apos;s a valid
                  National Pokédex number.
                </p>
              </li>
            </ul>
          </>
        )}
        {loaderData.pages && loaderData.pages > 1 && (
          <Pagination
            current={loaderData.page}
            href={(page) => (page === 1 ? "/" : `/?page=${page}`)}
            pages={loaderData.pages}
          />
        )}
      </Container>
    </main>
  </>
);

export default Home;
