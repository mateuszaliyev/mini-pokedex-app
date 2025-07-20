import { Button } from "@/components/button";
import { ArrowIcon } from "@/components/icons/arrow";
import { Link } from "@/components/link";

import { cx } from "@/utilities/classname";

export interface PaginationProps
  extends Omit<React.ComponentProps<"nav">, "children"> {
  current: number;
  href: (page: number) => string;
  pages: number;
}

export type PaginationSkeletonProps = Omit<
  React.ComponentProps<"div">,
  "children"
>;

const getPages = ({
  adjacent,
  current,
  pages,
}: {
  adjacent: number;
  current: number;
  pages: number;
}) => {
  const length = 2 * adjacent + 5;

  const ellipsis = {
    end: current < pages - adjacent - 2,
    start: current > adjacent + 3,
  };

  return Array.from({ length: Math.min(length, pages) }, (_, index) => {
    if (index === 0) return 1;
    if (index === length - 1) return pages;
    if (pages <= length) return index + 1;
    if (index === 1 && ellipsis.start) return -1;
    if (index === length - 2 && ellipsis.end) return -1;
    if (ellipsis.end && ellipsis.start) return current - adjacent - 2 + index;
    if (current <= adjacent + 3) return index + 1;
    return pages - 2 * adjacent - 4 + index;
  });
};

export const Pagination = ({
  className,
  current,
  href,
  pages,
  ...props
}: PaginationProps) => (
  <nav
    className={cx(
      "border-opacity-20 border-y border-white py-7 xl:py-10",
      className,
    )}
    {...props}
  >
    <ul className="flex items-center justify-center gap-1.5">
      <li>
        {current === 1 ? (
          <Button variant="secondary" disabled size="icon">
            <span className="sr-only">Previous page</span>
            <ArrowIcon className="size-6 -rotate-90" />
          </Button>
        ) : (
          <Button asChild variant="secondary" size="icon">
            <Link to={href(current - 1)}>
              <span className="sr-only">Previous page</span>
              <ArrowIcon className="size-6 -rotate-90" />
            </Link>
          </Button>
        )}
      </li>
      {getPages({ adjacent: 1, current, pages }).map((page, index) => (
        <li key={index}>
          {page === -1 ? (
            <span>&#8230;</span>
          ) : (
            <Button
              asChild
              variant={current === page ? "primary" : "secondary"}
              size="icon"
            >
              <Link to={href(page)}>
                <span className="sr-only">Page </span>
                {page}
              </Link>
            </Button>
          )}
        </li>
      ))}
      <li>
        {current === pages ? (
          <Button variant="secondary" disabled size="icon">
            <span className="sr-only">Next page</span>
            <ArrowIcon className="size-6 rotate-90" />
          </Button>
        ) : (
          <Button asChild variant="secondary" size="icon">
            <Link to={href(current + 1)}>
              <span className="sr-only">Next page</span>
              <ArrowIcon className="size-6 rotate-90" />
            </Link>
          </Button>
        )}
      </li>
    </ul>
  </nav>
);
