import { Icon, type IconProps } from "@/components/icons/icon";

export const PokeballIcon = ({
  fill = "currentColor",
  stroke = "none",
  ...props
}: Omit<IconProps, "children">) => (
  <Icon fill={fill} stroke={stroke} {...props}>
    <defs>
      <mask id="a">
        <path d="M0 0h24v24H0z" fill="#fff" />
        <circle cx="12" cy="12" fill="#000" r="7" />
        <path d="M0 12h24" fill="none" stroke="#000" />
      </mask>
    </defs>
    <circle cx="12" cy="12" mask="url(#a)" r="12" />
    <circle cx="12" cy="12" r="4" />
  </Icon>
);
