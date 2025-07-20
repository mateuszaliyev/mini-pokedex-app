import { Slot, type AsChild } from "@/components/slot";

import { cva, type VariantProps } from "@/utilities/classname";

export interface ButtonProps
  extends React.ComponentProps<"button">,
    AsChild,
    VariantProps<typeof button> {}

const button = cva({
  base: "flex items-center justify-center rounded-md text-sm font-medium transition outline-none",
  compoundVariants: [
    { className: "cursor-pointer", variant: ["primary", "secondary"] },
  ],
  defaultVariants: { variant: "primary", size: "md" },
  variants: {
    size: {
      icon: "aspect-square size-8 [&>svg]:size-4",
      md: "px-3 py-2",
    },
    variant: {
      disabled: "cursor-not-allowed bg-gray-100 text-gray-300",
      primary:
        "hocus-visible:text-gray-900 hocus-visible:from-gray-300 hocus-visible:to-gray-300 bg-gradient-to-br from-gray-400 to-gray-700 text-white",
      secondary:
        "hocus-visible:from-gray-400 hocus-visible:to-gray-700 hocus-visible:text-white bg-gradient-to-br from-gray-200 to-gray-200 text-gray-500",
    },
  },
});

export const Button = ({
  "aria-disabled": ariaDisabled,
  asChild,
  className,
  disabled,
  size,
  variant,
  ...props
}: ButtonProps) => {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      aria-disabled={ariaDisabled}
      className={button({
        className,
        size,
        variant: ariaDisabled || disabled ? "disabled" : variant,
      })}
      disabled={disabled}
      {...props}
    />
  );
};
