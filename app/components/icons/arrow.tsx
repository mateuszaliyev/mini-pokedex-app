import { Icon, type IconProps } from "@/components/icons/icon";

export const ArrowIcon = (props: Omit<IconProps, "children">) => (
  <Icon {...props}>
    <path d="M12 5l0 14" />
    <path d="M18 11l-6 -6" />
    <path d="M6 11l6 -6" />
  </Icon>
);
