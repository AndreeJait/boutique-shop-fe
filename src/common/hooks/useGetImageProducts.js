import { useEffect, useState } from 'react';

export default function useGetImageProducts() {
    const [images, setImages] = useState({});
    useEffect(() => {
        const importAllImages = (requireContext) => {
          const images = {};
          requireContext.keys().forEach((key) => {
            const imageName = key.replace("./", "").split(".")[0]; // Extract file name without extension
            images[imageName] = requireContext(key);
          });
          return images;
        };
        if (Object.keys(images).length === 0) {
          setImages(importAllImages(
            require.context("../../resources/img/products/boutique", false, /\.(png|jpe?g|svg)$/)
          ));
        }
      }, [images]);

    return [images, Object.keys(images)];
}