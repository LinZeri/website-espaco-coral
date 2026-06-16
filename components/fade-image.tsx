"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type FadeImageProps = ImageProps & {
  className?: string;
};

export function FadeImage({ className, alt, ...props }: FadeImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Image
      {...props}
      alt={alt}
      className={cn(
        "transition-opacity duration-700",
        isLoaded ? "opacity-100" : "opacity-0",
        className
      )}
      onLoad={() => setIsLoaded(true)}
    />
  );
}
