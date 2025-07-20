import { cx } from "@/utilities/classname";

export type DescriptionDetailsProps = React.ComponentProps<"dd">;

export type DescriptionListProps = React.ComponentProps<"dl">;

export type DescriptionListItemProps = React.ComponentProps<"div">;

export type DescriptionTermProps = React.ComponentProps<"dt">;

export const DescriptionDetails = ({
  className,
  ...props
}: DescriptionDetailsProps) => (
  <dd className={cx("text-gray-700", className)} {...props} />
);

export const DescriptionList = ({
  className,
  ...props
}: DescriptionListProps) => (
  <dl
    className={cx(
      "grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 font-medium",
      className,
    )}
    {...props}
  />
);

export const DescriptionListItem = ({
  className,
  ...props
}: DescriptionListItemProps) => (
  <div
    className={cx("col-span-full grid grid-cols-subgrid", className)}
    {...props}
  />
);

export const DescriptionTerm = ({
  className,
  ...props
}: DescriptionTermProps) => (
  <dt className={cx("min-w-32 text-gray-400", className)} {...props} />
);
