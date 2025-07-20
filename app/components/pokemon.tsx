import { href } from "react-router";

import type { Pokemon } from "@/api/pokemon";

import { Badge, Badges } from "@/components/badge";
import { PokeballIcon } from "@/components/icons/pokeball";
import { Image, type ImageProps } from "@/components/image";
import { Link, type LinkProps } from "@/components/link";
import { Skeleton, type SkeletonProps } from "@/components/skeleton";
import { Heading, Kicker } from "@/components/typography";

import { cva } from "@/utilities/classname";
import { formatNationalPokedexNumber } from "@/utilities/pokemon";
import { kebabCaseToSentenceCase } from "@/utilities/string";

export interface PokemonCardProps
  extends Omit<LinkProps, "to">,
    Pick<ImageProps, "priority"> {
  pokemon: Pick<Pokemon, "id" | "name" | "sprites" | "types">;
}

export type PokemonCardSkeletonProps = Omit<SkeletonProps, "children">;

const pokemonCardBase = cva({ base: "grid grid-cols-5 rounded-lg p-4" });

const pokemonCardSpriteContainer = cva({
  base: "col-span-2 mt-[max(-33.33%,-2.5rem)]",
});

export const PokemonCard = ({
  className,
  pokemon,
  priority,
  ...props
}: PokemonCardProps) => {
  const sprite = pokemon.sprites?.other.officialArtwork.frontDefault;

  return (
    <Link
      className={pokemonCardBase({
        className: [
          "group hocus-visible:bg-gray-50 relative isolate bg-gray-100 transition outline-none",
          className,
        ],
      })}
      to={href("/pokemon/:name", { name: pokemon.name })}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 z-[-1] overflow-hidden">
        <PokeballIcon className="absolute top-1/2 -right-6 h-[125%] -translate-y-1/2 animate-pulse mask-b-from-50% mask-b-to-90% text-gray-200" />
      </div>
      <div className="col-span-3">
        <Kicker>{formatNationalPokedexNumber(pokemon.id)}</Kicker>
        <Heading className="mt-1 truncate">
          {kebabCaseToSentenceCase(pokemon.name, { capitalize: true })}
        </Heading>
        <Badges className="mt-3">
          {pokemon.types.map((type) => (
            <Badge asChild className="capitalize" key={type.id}>
              <li>{type.name}</li>
            </Badge>
          ))}
        </Badges>
      </div>
      {sprite && (
        <div className={pokemonCardSpriteContainer()}>
          <Image
            /**
             * Empty `alt` to avoid information redundancy.
             */
            alt=""
            className="group-hocus-visible:scale-110 origin-top transition duration-300 ease-out"
            height={sprite.height}
            priority={priority}
            src={sprite.url}
            width={sprite.width}
          />
        </div>
      )}
    </Link>
  );
};

export const PokemonCardSkeleton = ({
  className,
  ...props
}: PokemonCardSkeletonProps) => (
  <Skeleton
    className={pokemonCardBase({ className: ["min-h-32", className] })}
    {...props}
  >
    <div className="col-span-3" />
    <div
      className={pokemonCardSpriteContainer({
        className: "aspect-square h-full",
      })}
    />
  </Skeleton>
);
