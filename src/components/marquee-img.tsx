// MarqueImg component: displays an image inside a marquee with consistent styling
// Props:
// - img: string - the source URL of the image to display
export const MarqueImg = ({ img }: { img: string }) => {
  return (
    <img
      src={img} // image source
      alt="" // alt text left empty; could add descriptive text for accessibility
      className="
        w-44 h-44        /* width and height for standard screens */
        xl:w-52 xl:h-52  /* larger size for extra-large screens */
        object-contain    /* maintain aspect ratio without cropping */
        grayscale        /* apply grayscale filter for visual uniformity */
        mx-12 xl:mx-16   /* horizontal margin spacing */
      "
    />
  );
};
