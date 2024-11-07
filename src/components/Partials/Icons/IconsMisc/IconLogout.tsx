import { SVGProps } from "react";

type Props = {
  svg?: SVGProps<SVGSVGElement>;
  path?: SVGProps<SVGPathElement>;
};

export const IconLogout = (props: Props) => {
  return (
    <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg" {...props.svg}>
      <path
        d="M17.5122 14H2.34552M2.34552 14L6.42885 10.5M2.34552 14L6.42885 17.5"
        stroke="#DC3444"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props.path}
      />
      <path
        d="M10.5145 8.16668C10.5285 5.62918 10.6417 4.25484 11.5377 3.35884C12.5632 2.33334 14.2129 2.33334 17.5122 2.33334H18.6789C21.9794 2.33334 23.629 2.33334 24.6545 3.35884C25.6789 4.38318 25.6789 6.03401 25.6789 9.33334V18.6667C25.6789 21.966 25.6789 23.6168 24.6545 24.6412C23.7574 25.5383 22.383 25.6503 19.8455 25.6643M10.5145 19.8333C10.5285 22.3708 10.6417 23.7452 11.5377 24.6412C12.2855 25.3902 13.367 25.592 15.1789 25.6468"
        stroke="#DC3444"
        strokeWidth="1.6"
        strokeLinecap="round"
        {...props.path}
      />
    </svg>
  );
};
