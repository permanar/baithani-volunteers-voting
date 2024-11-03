import { SVGProps } from "react";

type Props = {
  svg?: SVGProps<SVGSVGElement>;
  path?: SVGProps<SVGPathElement>;
};

export const IconArrow = (props: Props) => {
  return (
    <svg width="17" height="11" viewBox="0 0 17 11" fill="none" xmlns="http://www.w3.org/2000/svg" {...props.svg}>
      <path
        d="M1.5 5.01669C1.14101 5.01669 0.85 5.3077 0.85 5.66669C0.85 6.02567 1.14101 6.31669 1.5 6.31669V5.01669ZM15.9596 6.12631C16.2135 5.87247 16.2135 5.46091 15.9596 5.20707L11.823 1.07049C11.5692 0.816652 11.1576 0.816652 10.9038 1.07049C10.65 1.32433 10.65 1.73589 10.9038 1.98973L14.5808 5.66669L10.9038 9.34364C10.65 9.59748 10.65 10.009 10.9038 10.2629C11.1576 10.5167 11.5692 10.5167 11.823 10.2629L15.9596 6.12631ZM1.5 6.31669L15.5 6.31669V5.01669L1.5 5.01669V6.31669Z"
        fill="white"
        {...props.path}
      />
    </svg>
  );
};
