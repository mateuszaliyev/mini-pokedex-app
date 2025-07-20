import { cx } from "@/utilities/classname";

export type SkeletonProps = React.ComponentProps<"div">;

export const Skeleton = ({
  "aria-hidden": ariaHidden = true,
  className,
  ...props
}: SkeletonProps) => (
  <div
    aria-hidden={ariaHidden}
    className={cx("animate-pulse bg-gray-100", className)}
    {...props}
  />
);
