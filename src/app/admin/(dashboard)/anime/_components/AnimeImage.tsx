import { Image } from '@chakra-ui/react';

const NO_IMG_PATH = '/img/no-image01.png';

type Props = {
  src: string;
  alt: string;
  height?: string;
  width?: string;
  align?: string;
};

export default function AnimeImage({
  src,
  alt,
  height,
  width,
  align = 'left',
}: Props) {
  const handleError = (e: any) => {
    e.currentTarget.src = NO_IMG_PATH;
  };

  return (
    <Image
      src={src}
      alt={alt}
      h={height}
      w={width}
      align={align}
      objectFit='contain'
      onError={handleError}
    />
  );
}
