import { useNavigation } from "react-router";

export type FormActionNavigationPendingProps = {
  children?: React.ReactNode;
  fallback?: React.ReactNode;
};

export const FormActionNavigationPending = ({
  children,
  fallback,
}: FormActionNavigationPendingProps) => {
  const navigation = useNavigation();

  return navigation.formAction && navigation.state === "loading"
    ? fallback
    : children;
};
