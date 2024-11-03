import { SVGProps } from "react";

type Props = {
  svg?: SVGProps<SVGSVGElement>;
  path?: SVGProps<SVGPathElement>;
};

export const IconFacebook = (props: Props) => {
  return (
    <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props.svg}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.11158 3.75H8.12179V2.125H7.11158C6.51676 2.12572 5.94651 2.36232 5.52592 2.78292C5.10532 3.20352 4.86871 3.77377 4.86799 4.36858V5.375H3.78845V7H4.87179V12.3831H6.49679V7H7.59149L7.91216 5.375H6.49679V4.07013C6.49805 3.98552 6.53225 3.90475 6.59213 3.84497C6.65201 3.78519 6.73285 3.75112 6.81745 3.75H7.11158Z"
        fill="#252525"
        {...props.path}
      />
    </svg>
  );
};
