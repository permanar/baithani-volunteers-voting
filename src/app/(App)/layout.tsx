import { IconBgStar, IconBgStar2 } from "@/components/Partials/Icons";
import { Fragment } from "react";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Fragment>
      <div className="absolute top-[40vh] md:top-64 bottom-auto -left-52 md:-left-80 w-[468px] h-[468px] md:w-[638px] md:h-[638px] -z-10">
        <IconBgStar svg={{ className: "w-full h-full" }} />
      </div>
      <div className="absolute top-0 md:-top-72 -right-64 w-[600px] h-[310px] md:h-[961px] -z-10">
        <IconBgStar2 svg={{ className: "w-full h-full" }} />
      </div>

      {children}
    </Fragment>
  );
}
