'use client';

import { AddIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import NextLink from 'next/link';

type Props = {
  link?: string;
  text?: string;
};

export default function CreateButton({ text = '作成', link }: Props) {
  return (
    <Button
      leftIcon={<AddIcon />}
      as={NextLink}
      href={link}
      w='100px'
      colorScheme='blue'
    >
      {text}
    </Button>
  );
}
