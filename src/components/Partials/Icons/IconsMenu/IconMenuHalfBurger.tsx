import { SVGProps } from "react";

type Props = {
  svg?: SVGProps<SVGSVGElement>;
  path?: SVGProps<SVGPathElement>;
};

export const IconMenuHalfBurger = (props: Props) => {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props.svg}>
      <path
        d="M15 9H7.5M15 3.75H3M15 14.25H3"
        stroke="black"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props.path}
      />
    </svg>
  );
};
