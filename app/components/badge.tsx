import { Slot, type AsChild } from "@/components/slot";

import { cx } from "@/utilities/classname";

export interface BadgeProps extends React.ComponentProps<"span">, AsChild {}

export type BadgesProps = React.ComponentProps<"ul">;

export const Badge = ({ asChild, className, ...props }: BadgeProps) => {
  const Component = asChild ? Slot : "span";

  return (
    <Component
      className={cx(
        "cursor-default rounded-full bg-gray-900/5 px-2 py-1 text-xs font-medium text-gray-500",
        className,
      )}
      {...props}
    />
  );
};

export const Badges = ({ className, ...props }: BadgesProps) => (
  <ul
    className={cx("flex flex-wrap items-center gap-1", className)}
    {...props}
  />
);
