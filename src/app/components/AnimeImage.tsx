import { NO_IMG_PATH } from '@/utils/utils';
import { Image } from '@chakra-ui/react';

type Props = {
  src: string | null;
  alt: string;
  height?: string;
  width?: string;
  align?: string;
  objectFit?: 'contain' | 'cover';
  borderRadius?: string;
};

export default function AnimeImage({
  src,
  alt,
  height,
  width = '100%',
  align = 'left',
  objectFit = 'contain',
  borderRadius,
}: Props) {
  const handleError = (e: any) => {
    e.currentTarget.src = NO_IMG_PATH;
  };

  return (
    <Image
      src={src || NO_IMG_PATH}
      alt={alt}
      h={height}
      w={width}
      align={align}
      borderRadius={borderRadius}
      objectFit={objectFit}
      onError={handleError}
    />
  );
}
