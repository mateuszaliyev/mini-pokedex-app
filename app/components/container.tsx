import { cx } from "@/utilities/classname";

export type ContainerProps = React.ComponentProps<"div">;

export const Container = ({ className, ...props }: ContainerProps) => (
  <div className={cx("mx-auto max-w-4xl px-6", className)} {...props} />
);
