import { Button } from "@/components/button";
import { ArrowIcon } from "@/components/icons/arrow";
import { SearchIcon } from "@/components/icons/search";

import { cx } from "@/utilities/classname";

export type InputProps = React.ComponentProps<"input">;

export type SearchProps = React.ComponentProps<"div">;

export const Input = ({ className, ...props }: InputProps) => (
  <input
    className={cx(
      "w-full rounded-lg bg-gray-100 p-4 ring ring-transparent transition outline-none placeholder:text-gray-500 placeholder-shown:text-ellipsis focus:ring-gray-400",
      className,
    )}
    {...props}
  />
);

export const Search = ({ children, className, ...props }: SearchProps) => (
  <div
    className={cx("relative [&>input]:pr-14 [&>input]:pl-11", className)}
    {...props}
  >
    <SearchIcon className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-gray-900" />
    {children}
    <Button
      className="absolute top-1/2 right-3 -translate-y-1/2"
      variant="secondary"
      size="icon"
    >
      <ArrowIcon className="size-4 rotate-90" />
      <span className="sr-only">Search</span>
    </Button>
  </div>
);
