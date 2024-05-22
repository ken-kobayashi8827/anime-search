'use client';

import { Image } from '@chakra-ui/react';

const NO_IMG_PATH = '/img/no-image01.png';

type Props = {
  src: string;
  alt: string;
  width: string;
};

export default function AnimeImage({ src, alt, width }: Props) {
  const handleError = (e: any) => {
    e.currentTarget.src = NO_IMG_PATH;
  };

  return <Image src={src} alt={alt} width={width} onError={handleError} />;
}
