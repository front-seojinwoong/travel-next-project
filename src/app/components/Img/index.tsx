"use client";

import Image from "next/image";

const Img = ({ src, alt, cn }: { src: string; alt: string; cn?: string }) => (
  <Image
    src={src}
    alt={alt}
    width={0}
    height={0}
    sizes='100vw'
    className={cn}
  />
);

export default Img;
