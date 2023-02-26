import { ArrowLeftCircleIcon } from '@heroicons/react/24/solid';
import { ArrowRightCircleIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

export default function CarouselSlider({ images }: { images: string[] }) {
  const [currentImage, setCurrentImage] = useState(0);

  const previousImage = () => {
    setCurrentImage((prev) =>
      currentImage === 0 ? images.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1 === images.length ? 0 : prev + 1));
  };

  return (
    <div className="carousel-slider">
      <img src={images[currentImage]} alt="user-image" />
      {images.length > 1 && (
        <ArrowLeftCircleIcon
          color="#d1d5db"
          onClick={(e) => {
            e.preventDefault();
            previousImage();
          }}
          width="32px"
        />
      )}
      {images.length > 1 && (
        <ArrowRightCircleIcon
          color="#d1d5db"
          onClick={(e) => {
            e.preventDefault();
            nextImage();
          }}
          width="32px"
        />
      )}
    </div>
  );
}
