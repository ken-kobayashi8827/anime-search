import { Button } from '@chakra-ui/react';
import NextLink from 'next/link';

type LinkButtonType = {
  link: string;
  colorScheme?: string;
  mt?: string;
  width?: string;
  text?: string;
  variant?: string;
};

export default function LinkButton({
  link,
  colorScheme,
  mt,
  width,
  text,
  variant,
}: LinkButtonType) {
  return (
    <Button
      as={NextLink}
      href={link}
      w={width}
      colorScheme={colorScheme}
      mt={mt}
      variant={variant}
    >
      {text}
    </Button>
  );
}
