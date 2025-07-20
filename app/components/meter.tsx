import { cx } from "@/utilities/classname";

export interface MeterProps extends React.ComponentProps<"div"> {
  max?: number;
  min?: number;
  text: string;
  value: number;
}

export const Meter = ({
  "aria-valuemax": ariaValueMax,
  "aria-valuemin": ariaValueMin,
  "aria-valuenow": ariaValueNow,
  "aria-valuetext": ariaValueText,
  className,
  max = 100,
  min = 0,
  role = "meter",
  style,
  text,
  value,
  ...props
}: MeterProps) => {
  const denominator = max - min;
  const fraction = denominator ? (value - min) / denominator : 0;
  const percentage = `${100 * fraction}%`;

  return (
    <div
      aria-valuemax={ariaValueMax ?? max}
      aria-valuemin={ariaValueMin ?? min}
      aria-valuenow={ariaValueNow ?? value}
      aria-valuetext={ariaValueText ?? text}
      className={cx(
        "h-1.5 w-full rounded-full bg-gradient-to-r from-emerald-600 via-emerald-400 to-gray-200",
        className,
      )}
      role={role}
      style={
        {
          "--tw-gradient-via-position": percentage,
          "--tw-gradient-to-position": percentage,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    />
  );
};
