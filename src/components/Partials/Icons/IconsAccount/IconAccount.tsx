import { SVGProps } from "react";

type Props = {
  svg?: SVGProps<SVGSVGElement>;
  path?: SVGProps<SVGPathElement>;
};

export const IconAccount = (props: Props) => {
  return (
    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" {...props.svg}>
      <path
        d="M4 18.6667C4 17.6058 4.42143 16.5884 5.17157 15.8383C5.92172 15.0881 6.93913 14.6667 8 14.6667H16C17.0609 14.6667 18.0783 15.0881 18.8284 15.8383C19.5786 16.5884 20 17.6058 20 18.6667C20 19.1971 19.7893 19.7058 19.4142 20.0809C19.0391 20.456 18.5304 20.6667 18 20.6667H6C5.46957 20.6667 4.96086 20.456 4.58579 20.0809C4.21071 19.7058 4 19.1971 4 18.6667Z"
        stroke="#CC7EAC"
        strokeLinejoin="round"
        {...props.path}
      />
      <path
        d="M12 10.6667C13.6569 10.6667 15 9.32354 15 7.66669C15 6.00983 13.6569 4.66669 12 4.66669C10.3431 4.66669 9 6.00983 9 7.66669C9 9.32354 10.3431 10.6667 12 10.6667Z"
        stroke="#CC7EAC"
        {...props.path}
      />
    </svg>
  );
};
