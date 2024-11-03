import { SVGProps } from "react";

type Props = {
  svg?: SVGProps<SVGSVGElement>;
  path?: SVGProps<SVGPathElement>;
};

export const IconStar = (props: Props) => {
  return (
    <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props.svg}>
      <path
        d="M8.5 0.467102L6.87324 7.7337L0 9.11211L6.87324 10.8773L8.5 17.7571L9.96414 10.8773L17 9.11211L9.96414 7.7337L8.5 0.467102Z"
        fill="#DCAEC9"
        {...props.path}
      />
    </svg>
  );
};
