import { cva, cx, type VariantProps } from "@/utilities/classname";

export interface HeadingProps
  extends React.ComponentProps<"h2">,
    VariantProps<typeof heading> {
  as?: Extract<keyof React.JSX.IntrinsicElements, `h${number}`>;
}

export type KickerProps = React.ComponentProps<"p">;

const heading = cva({
  base: "font-bold text-balance text-gray-900",
  defaultVariants: { level: 2 },
  variants: {
    level: {
      1: "text-3xl",
      2: "text-2xl",
      3: "text-xl",
      none: "",
    },
  },
});

export const Heading = ({
  as: Component = "h2",
  className,
  level,
  ...props
}: HeadingProps) => (
  <Component className={heading({ className, level })} {...props} />
);

export const Kicker = ({ className, ...props }: KickerProps) => (
  <p className={cx("text-sm font-bold text-gray-400", className)} {...props} />
);
