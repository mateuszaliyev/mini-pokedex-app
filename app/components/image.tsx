export interface ImageProps extends React.ComponentProps<"img"> {
  priority?: boolean;
}

export const Image = ({
  decoding,
  loading,
  priority = false,
  ...props
}: ImageProps) => (
  <img
    decoding={decoding ?? (priority ? "sync" : "async")}
    loading={loading ?? (priority ? "eager" : "lazy")}
    {...props}
  />
);
