"use client";

import Image from "next/image";
import React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

type Props = {
  src: string;
  alt: string;
  thumbContainerClassName?: string; // size/position classes for thumbnail wrapper
  imageClassName?: string; // classes for the <Image> element
  modalHeightClassName?: string; // height of preview container, default h-[70vh]
};

export function LogoPreview({
  src,
  alt,
  thumbContainerClassName = "relative w-16 h-16",
  imageClassName = "object-contain rounded-md bg-white p-1",
  modalHeightClassName = "h-[70vh]",
}: Props) {
  // Note: modalHeightClassName is kept for compatibility; react-photo-view manages its own layout.
  return (
    <div className={thumbContainerClassName}>
      <PhotoProvider maskOpacity={0.5} speed={() => 300} easing={() => "ease-out"}>
        <PhotoView src={src}>
          {/* Using next/image as the thumbnail; PhotoView will open the lightbox on click */}
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 640px) 64px, (max-width: 1024px) 96px, 128px"
            className={`${imageClassName} cursor-zoom-in`}
          />
        </PhotoView>
      </PhotoProvider>
    </div>
  );
}

export default LogoPreview;
