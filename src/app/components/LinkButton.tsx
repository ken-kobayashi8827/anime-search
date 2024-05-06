'use client';

import { Link } from '@chakra-ui/next-js';
import { Button } from '@chakra-ui/react';

type LinkButtonType = {
  link: string;
  colorScheme: string;
  mt: string;
  width: string;
  text: string;
};

export default function LinkButton({
  link,
  colorScheme,
  mt,
  width,
  text,
}: LinkButtonType) {
  return (
    <Link href={link}>
      <Button w={width} colorScheme={colorScheme} mt={mt}>
        {text}
      </Button>
    </Link>
  );
}
