import { Icon, type IconProps } from "@/components/icons/icon";

export const SearchIcon = (props: Omit<IconProps, "children">) => (
  <Icon {...props}>
    <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
    <path d="M21 21l-6 -6" />
  </Icon>
);
